import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/contact.js';

const realFetch = globalThis.fetch;
let calls;
let turnstileResult;
let resendStatus;

beforeEach(() => {
  calls = [];
  turnstileResult = { success: true };
  resendStatus = 200;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes('siteverify')) return Response.json(turnstileResult);
    if (String(url).includes('api.resend.com')) {
      return new Response(JSON.stringify({ id: 'x' }), { status: resendStatus });
    }
    throw new Error(`unexpected fetch ${url}`);
  };
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

function makeEnv(overrides = {}) {
  const kv = [];
  return {
    kv,
    TURNSTILE_SECRET_KEY: 'secret',
    RESEND_API_KEY: 're_test',
    CONTACT_TO: 'celina@example.com, backup@example.com',
    CONTACT_FROM: 'wigglebutts <form@notify.wigglebutts.dog>',
    SUBMISSIONS: { put: async (k, v) => kv.push([k, v]) },
    ...overrides,
  };
}

const valid = {
  first_name: 'Ana',
  last_name: 'Diaz',
  email: 'ana@example.com',
  phone: '(970) 555-0100',
  zip: '80521',
  message: 'Two corgis.\r\nOne is shy.',
  'cf-turnstile-response': 'tok',
};

async function post(fields, env = makeEnv()) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  const request = new Request('https://wigglebutts.dog/api/contact', {
    method: 'POST',
    body: fd,
    headers: { 'CF-Connecting-IP': '203.0.113.7' },
  });
  const res = await onRequestPost({ request, env });
  return { res, body: await res.json(), env };
}

const resendPayload = () => JSON.parse(calls.find((c) => c.url.includes('resend')).init.body);

test('happy path: verifies, backs up, emails, returns ok', async () => {
  const { res, body, env } = await post(valid);
  assert.equal(res.status, 200);
  assert.deepEqual(body, { ok: true });
  assert.equal(res.headers.get('cache-control'), 'no-store');

  const verify = calls.find((c) => c.url.includes('siteverify')).init.body;
  assert.equal(verify.get('secret'), 'secret');
  assert.equal(verify.get('response'), 'tok');
  assert.equal(verify.get('remoteip'), '203.0.113.7');

  assert.equal(env.kv.length, 1);
  assert.match(env.kv[0][0], /^submission:\d{4}-\d{2}-\d{2}T[\d:.]+Z:[0-9a-f-]{36}$/);
  assert.equal(JSON.parse(env.kv[0][1]).email, 'ana@example.com');

  const p = resendPayload();
  const headers = calls.find((c) => c.url.includes('resend')).init.headers;
  assert.equal(headers.Authorization, 'Bearer re_test');
  assert.equal(p.from, 'wigglebutts <form@notify.wigglebutts.dog>');
  assert.deepEqual(p.to, ['celina@example.com', 'backup@example.com']);
  assert.equal(p.reply_to, 'ana@example.com');
  assert.equal(p.subject, 'New inquiry: Ana Diaz');
  assert.match(p.html, /href="mailto:ana@example\.com"/);
  assert.match(p.html, /href="tel:9705550100"/);
  assert.match(p.html, /href="https:\/\/maps\.google\.com\/maps\?q=80521"/);
  assert.match(p.html, /Two corgis\.<br>One is shy\./);
  assert.doesNotMatch(p.html, /\r/);
  assert.match(p.html, /(MST|MDT)/);
  assert.match(p.text, /Two corgis\.\nOne is shy\./);
});

test('KV is optional and KV errors do not block the email', async () => {
  let r = await post(valid, makeEnv({ SUBMISSIONS: undefined }));
  assert.equal(r.res.status, 200);
  r = await post(valid, makeEnv({ SUBMISSIONS: { put: async () => { throw new Error('kv down'); } } }));
  assert.equal(r.res.status, 200);
  assert.ok(calls.some((c) => c.url.includes('resend')));
});

test('escapes HTML in every user value', async () => {
  await post({
    ...valid,
    first_name: '<script>alert(1)</script>',
    last_name: 'O"Brien & <b>',
    message: '<img src=x onerror=alert(1)>\nhi',
    zip: '<z>',
  });
  const { html, subject } = resendPayload();
  assert.doesNotMatch(html, /<script>|<img src=x|<b>|<z>/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /O&quot;Brien &amp; &lt;b&gt;/);
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;<br>hi/);
  assert.match(html, /maps\?q=%3Cz%3E/);
  assert.equal(subject, 'New inquiry: <script>alert(1)</script> O"Brien & <b>');
});

test('honeypot filled: pretends success, sends nothing', async () => {
  const { res, body, env } = await post({ ...valid, website: 'http://spam.example' });
  assert.equal(res.status, 200);
  assert.deepEqual(body, { ok: true });
  assert.equal(calls.length, 0);
  assert.equal(env.kv.length, 0);
});

test('missing required fields: 400', async () => {
  for (const k of ['first_name', 'email', 'phone', 'message']) {
    calls = [];
    const { res, body } = await post({ ...valid, [k]: '   ' });
    assert.equal(res.status, 400, k);
    assert.equal(body.error, 'missing_fields');
    assert.deepEqual(body.fields, [k]);
    assert.equal(calls.length, 0);
  }
});

test('invalid email: 400', async () => {
  const { res, body } = await post({ ...valid, email: 'not-an-email' });
  assert.equal(res.status, 400);
  assert.equal(body.error, 'invalid_email');
  assert.equal(calls.length, 0);
});

test('optional fields blank: still sends', async () => {
  const { res } = await post({ ...valid, last_name: '', zip: '' });
  assert.equal(res.status, 200);
  const p = resendPayload();
  assert.equal(p.subject, 'New inquiry: Ana');
  assert.match(p.html, /Not given/);
  assert.doesNotMatch(p.html, /maps\.google/);
});

test('trims and caps field lengths', async () => {
  await post({ ...valid, first_name: '  Ana\n  Maria  ', message: 'x'.repeat(6000) });
  const p = resendPayload();
  assert.equal(p.subject, 'New inquiry: Ana Maria Diaz');
  assert.equal(p.text.match(/x{100,}/)[0].length, 5000);
});

test('Turnstile failure: 403, no email', async () => {
  turnstileResult = { success: false, 'error-codes': ['invalid-input-response'] };
  const { res, body } = await post(valid);
  assert.equal(res.status, 403);
  assert.equal(body.error, 'verification_failed');
  assert.ok(!calls.some((c) => c.url.includes('resend')));
});

test('missing Turnstile token or wrong action: 403', async () => {
  const noToken = { ...valid };
  delete noToken['cf-turnstile-response'];
  assert.equal((await post(noToken)).res.status, 403);
  turnstileResult = { success: true, action: 'login' };
  assert.equal((await post(valid)).res.status, 403);
});

test('Resend failure: 502', async () => {
  resendStatus = 422;
  const { res, body } = await post(valid);
  assert.equal(res.status, 502);
  assert.equal(body.error, 'send_failed');
});

test('missing configuration: 500 before verifying or sending', async () => {
  const { res, body } = await post(valid, makeEnv({ RESEND_API_KEY: undefined }));
  assert.equal(res.status, 500);
  assert.equal(body.error, 'not_configured');
  assert.equal(calls.length, 0);
});
