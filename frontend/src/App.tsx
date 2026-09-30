import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ShaderBackground } from './components/ui/ShaderBackground';
import { CustomCursor } from './components/ui/CustomCursor';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { ServicesPage } from './pages/ServicesPage';
import { CasesPage } from './pages/CasesPage';
import { ModusOperandiPage } from './pages/ModusOperandiPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PatternsPage } from './pages/PatternsPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      {/* Dynamic Background WebGL Shader */}
      <ShaderBackground />

      {/* High Precision Interactive Crosshair Cursor */}
      <CustomCursor />

      {/* Main Application Shell */}
      <div className="flex flex-col min-h-screen relative z-0">
        <Header />

        <main className="flex-1 mt-16">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/modus-operandi" element={<ModusOperandiPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/patterns" element={<PatternsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </main>

        <Footer />
        <MobileNav />
      </div>
    </Router>
  );
};

export default App;
