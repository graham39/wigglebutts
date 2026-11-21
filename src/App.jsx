import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import NewClientsPage from './pages/NewClientsPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import PageTitle from './components/PageTitle.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/new-clients" element={<NewClientsPage />} />
        <Route path="/thanks" element={<ThankYouPage />} />
        <Route path="/book" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
