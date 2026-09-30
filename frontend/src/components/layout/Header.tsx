import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'DASHBOARD' },
  { to: '/services', label: 'SERVICES' },
  { to: '/cases', label: 'CASE TYPES' },
  { to: '/modus-operandi', label: 'MODUS OPERANDI' },
  { to: '/analytics', label: 'ANALYTICS' },
  { to: '/patterns', label: 'PATTERNS' },
  { to: '/team', label: 'TEAM' },
  { to: '/contact', label: 'GET IN TOUCH' },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'h-14 bg-surface-deep/90 backdrop-blur-xl border-outline-variant shadow-lg'
          : 'h-16 bg-surface-dim/75 backdrop-blur-md border-outline-variant/60'
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Command Tag */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-DEFAULT bg-primary/10 border border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-primary fill text-xl group-hover:scale-110 transition-transform">
              security
            </span>
          </div>
          <div>
            <div className="font-label-caps text-xs sm:text-sm text-primary tracking-widest font-bold flex items-center gap-1.5">
              FORENSOLVE <span className="text-slate-muted font-normal">// COMMAND CENTER</span>
            </div>
            <div className="font-data-mono text-[9px] text-slate-muted hidden sm:block tracking-wider">
              UNIT ALPHA-9 | ISO-17025 ACCREDITED
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-label-caps text-[11px] px-2.5 py-1.5 border transition-all duration-200 tracking-wider ${
                  isActive
                    ? 'text-primary border-primary/60 bg-primary/10 shadow-[0_0_12px_rgba(244,195,103,0.2)]'
                    : 'text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant hover:bg-surface-elevated/60'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* System Online Telemetry Badge & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-elevated border border-outline-variant font-data-mono text-[11px] text-evidence-green">
            <span className="status-pulse">●</span>
            <span className="hidden sm:inline">SYSTEM ONLINE</span>
            <span className="sm:hidden">ONLINE</span>
          </div>

          <Link
            to="/contact"
            className="hidden md:flex bg-primary text-black font-label-caps text-[11px] px-3.5 py-1.5 hover:bg-primary-container transition-colors btn-glow items-center gap-1.5 font-bold"
          >
            <span className="material-symbols-outlined text-sm">emergency</span>
            SUBMIT CASE
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 border border-outline-variant text-slate-muted hover:text-primary transition-colors bg-surface-elevated"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-deep/95 backdrop-blur-xl border-b border-outline-variant px-6 py-5 space-y-2 animate-fadeIn">
          <div className="font-data-mono text-[10px] text-slate-muted mb-2 tracking-widest">
            // TACTICAL NAVIGATION MODULES
          </div>
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-label-caps text-xs p-2.5 border transition-all ${
                    isActive
                      ? 'text-primary border-primary bg-primary/15'
                      : 'text-on-surface-variant border-outline-variant/60 bg-surface-dim/60 hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
