// POST /api/contact — Cloudflare Pages Function behind the contact form.
// Config lives in the Pages dashboard (see CLAUDE.md, "Contact form"); there is
// deliberately no wrangler.toml, because one would override the dashboard bindings.

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL = 'https://api.resend.com/emails';
const TURNSTILE_ACTION = 'contact';

const FIELDS = {
  first_name: { max: 80, required: true },
  last_name: { max: 80 },
  email: { max: 254, required: true },
  phone: { max: 40, required: true },
  zip: { max: 10 },
  message: { max: 5000, required: true, multiline: true },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'invalid_request' }, 400);
  }

  // Bots fill every field; people never see this one.
  if (str(form.get('website')).trim()) {
    return json({ ok: true });
  }

  const data = {};
  for (const [name, rule] of Object.entries(FIELDS)) {
    let v = str(form.get(name));
    // Single-line fields: collapse any whitespace (incl. newlines) so nothing spills into the subject.
    v = rule.multiline ? v.replace(/\r\n?/g, '\n').trim() : v.replace(/\s+/g, ' ').trim();
    data[name] = v.slice(0, rule.max);
  }

  const missing = Object.keys(FIELDS).filter((k) => FIELDS[k].required && !data[k]);
  if (missing.length) {
    return json({ ok: false, error: 'missing_fields', fields: missing }, 400);
  }
  if (!EMAIL_RE.test(data.email)) {
    return json({ ok: false, error: 'invalid_email', fields: ['email'] }, 400);
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('contact: missing configuration (TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_TO or CONTACT_FROM)');
    return json({ ok: false, error: 'not_configured' }, 500);
  }

  const token = str(form.get('cf-turnstile-response'));
  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (!(await verifyTurnstile(token, ip, env.TURNSTILE_SECRET_KEY))) {
    return json({ ok: false, error: 'verification_failed' }, 403);
  }

  const submittedAt = new Date();
  if (env.SUBMISSIONS) {
    try {
      const key = `submission:${submittedAt.toISOString()}:${crypto.randomUUID()}`;
      await env.SUBMISSIONS.put(key, JSON.stringify({ ...data, submittedAt: submittedAt.toISOString() }));
    } catch (err) {
      console.error('contact: KV backup failed', err);
    }
  }

  const name = [data.first_name, data.last_name].filter(Boolean).join(' ');
  let res;
  try {
    res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: env.CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `New inquiry: ${name}`,
        html: renderHtml(data, submittedAt),
        text: renderText(data, submittedAt),
      }),
    });
  } catch (err) {
    console.error('contact: Resend request failed', err);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  if (!res.ok) {
    console.error('contact: Resend returned', res.status, await res.text().catch(() => ''));
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  return json({ ok: true });
}

async function verifyTurnstile(token, ip, secret) {
  if (!token || token.length > 2048) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    const out = await res.json();
    if (!out.success) {
      console.warn('contact: Turnstile rejected', out['error-codes']);
      return false;
    }
    // Test keys return no action; real tokens must come from this form's widget.
    if (out.action && out.action !== TURNSTILE_ACTION) {
      console.warn('contact: Turnstile action mismatch', out.action);
      return false;
    }
    return true;
  } catch (err) {
    console.error('contact: Turnstile verify failed', err);
    return false;
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

function str(v) {
  return typeof v === 'string' ? v : '';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDenver(d) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(d);
}

function renderHtml(data, submittedAt) {
  const e = escapeHtml;
  const name = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const tel = data.phone.replace(/[^\d+]/g, '');
  const link = 'color:#5b4687;text-decoration:none;border-bottom:1px solid #c4b0e8;';
  const labelCss =
    "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1a1a1a;";
  const valueCss = "font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.35;color:#1a1a1a;";

  const rows = [
    ['Name', e(name)],
    ['Email', `<a href="mailto:${e(data.email)}" style="${link}">${e(data.email)}</a>`],
    ['Phone', tel ? `<a href="tel:${e(tel)}" style="${link}">${e(data.phone)}</a>` : e(data.phone)],
    [
      'Zip code',
      data.zip
        ? `<a href="https://maps.google.com/maps?q=${encodeURIComponent(data.zip)}" style="${link}">${e(data.zip)}</a>`
        : '<span style="color:#9a9388;">Not given</span>',
    ],
  ]
    .map(
      ([label, value]) => `
                  <tr>
                    <td style="padding:18px 0;border-bottom:1px solid #1a1a1a;width:118px;vertical-align:middle;${labelCss}">${label}</td>
                    <td style="padding:18px 0;border-bottom:1px solid #1a1a1a;vertical-align:middle;${valueCss}">${value}</td>
                  </tr>`
    )
    .join('');

  const message = e(data.message).replace(/\r?\n/g, '<br>');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
    <title>New client inquiry</title>
    <style>a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}</style>
  </head>
  <body style="margin:0;padding:0;background:#f4f1ec;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr>
              <td align="center" style="background:#111111;padding:34px 28px 30px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:40px;line-height:1;color:#efe9dc;">wigglebutts</div>
                <div style="margin-top:16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#b8b0a0;">New client inquiry</div>
              </td>
            </tr>
            <tr><td style="background:#c4b0e8;height:6px;line-height:6px;font-size:0;">&nbsp;</td></tr>
            <tr>
              <td style="background:#ffffff;padding:30px 36px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}
                </table>
                <div style="margin-top:30px;${labelCss}">What they're looking for</div>
                <div style="margin-top:14px;padding:18px 20px;border-left:4px solid #c4b0e8;border-radius:0 6px 6px 0;background:#f3f0f7;${valueCss}font-size:17px;line-height:1.6;">${message}</div>
                <div style="margin-top:24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#7a7263;">Reply to this email to answer ${e(data.first_name)} directly.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#9a9388;text-align:center;">Submitted ${e(formatDenver(submittedAt))} via wigglebutts.dog/contact</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(data, submittedAt) {
  const name = [data.first_name, data.last_name].filter(Boolean).join(' ');
  return [
    'New inquiry from wigglebutts.dog',
    '',
    `Name:  ${name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Zip:   ${data.zip || 'Not given'}`,
    '',
    'About their pets:',
    data.message.replace(/\r\n?/g, '\n'),
    '',
    `Submitted ${formatDenver(submittedAt)}`,
  ].join('\n');
}
