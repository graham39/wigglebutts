import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../data/content.js';

export default function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Static hosts often serve prerendered pages at a trailing-slash URL (/about/).
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const meta = SEO[path] || SEO['/'];
    document.title = meta.title;
  }, [pathname]);
  return null;
}
