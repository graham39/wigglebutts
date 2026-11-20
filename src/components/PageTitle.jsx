import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../data/content.js';

export default function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = SEO[pathname] || SEO['/'];
    document.title = meta.title;
  }, [pathname]);
  return null;
}
