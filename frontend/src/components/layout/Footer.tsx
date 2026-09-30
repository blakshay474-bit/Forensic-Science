import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-14 bg-surface-deep/90 backdrop-blur-md border-t border-outline-variant mb-16 md:mb-0 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">security</span>
              <span className="font-display-lg text-primary text-xl font-bold tracking-wider">
                FORENSOLVE
              </span>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Pioneering forensic science solutions since 2008. We combine cutting-edge analytical instrumentation with machine learning telemetry to deliver justice through science.
            </p>
            <div className="inline-block px-2.5 py-1 bg-surface-elevated border border-outline-variant font-data-mono text-[10px] text-evidence-green">
              ACCREDITATION: ISO/IEC 17025:2017 #FS-99182
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <div className="font-label-caps text-xs text-primary tracking-widest">
              CAPABILITIES
            </div>
            <ul className="space-y-2 font-data-mono text-xs text-slate-muted">
              <li>
                <Link to="/services" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> DNA & Biological Profiling
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> Digital & Cyber Forensics
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> 3D Crime Scene LiDAR Recon
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> GC-MS Toxicology & Chemistry
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> Questioned Document Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence Modules */}
          <div className="space-y-3">
            <div className="font-label-caps text-xs text-primary tracking-widest">
              INTELLIGENCE
            </div>
            <ul className="space-y-2 font-data-mono text-xs text-slate-muted">
              <li>
                <Link to="/analytics" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> Crime Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/cases" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> Investigation Case Types
                </Link>
              </li>
              <li>
                <Link to="/modus-operandi" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> Modus Operandi Profiling
                </Link>
              </li>
              <li>
                <Link to="/patterns" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> Pattern Correlation Matrix
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-tertiary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-[10px]">›</span> Forensic Expert Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Protocols */}
          <div className="space-y-3">
            <div className="font-label-caps text-xs text-primary tracking-widest">
              CHAIN OF CUSTODY
            </div>
            <div className="space-y-2 font-data-mono text-xs text-slate-muted">
              <div className="text-[11px] text-on-surface-variant">
                EMERGENCY DISPATCH HOTLINE:
              </div>
              <div className="text-primary font-bold text-sm">
                +1 (800) 555-0911
              </div>
              <div className="text-[10px] text-slate-muted">
                24/7/365 SECURE CASE INTAKE ENCRYPTION ACTIVE (AES-256-GCM)
              </div>
              <div className="pt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-surface-dim border border-outline-variant text-[10px]">DOJ COMPLIANT</span>
                <span className="px-2 py-0.5 bg-surface-dim border border-outline-variant text-[10px]">CJIS READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 font-data-mono text-xs text-slate-muted">
          <div>
            © 2025 FORENSOLVE EXPERTS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#privacy" className="hover:text-primary transition-colors">PRIVACY PROTOCOL</a>
            <a href="#terms" className="hover:text-primary transition-colors">TERMS OF SERVICE</a>
            <a href="#custody" className="hover:text-primary transition-colors">CHAIN-OF-CUSTODY</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
