import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HERO_STATS, CORE_PILLARS, CASE_CATEGORIES } from '../data/forensicData';
import { StatCounter } from '../components/ui/StatCounter';
import { DossierCard } from '../components/ui/DossierCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';

export const DashboardPage: React.FC = () => {
  const [activeDossierModal, setActiveDossierModal] = useState<boolean>(false);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-16 pb-16 border-b border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Unit Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-elevated/90 border border-tertiary/40 font-data-mono text-xs text-tertiary shadow-[0_0_15px_rgba(0,223,246,0.15)]">
              <span className="material-symbols-outlined text-sm">memory</span>
              <span>UNIT_ID: ALPHA-9 // LIVE TELEMETRY FEED</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-on-surface">
              Unraveling Truth Through <br />
              <span className="text-primary text-glow">Forensic Science</span>
            </h1>

            {/* Sub-headline */}
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl border-l-2 border-primary pl-4 leading-relaxed">
              ForenSolve Experts delivers cutting-edge forensic analysis, crime pattern correlation, and data-driven insights to law enforcement agencies, legal teams, and investigative organizations worldwide.
            </p>

            {/* Tactical Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/services"
                className="bg-primary text-black font-label-caps text-xs sm:text-sm px-8 py-4 rounded-DEFAULT flex items-center justify-center gap-2.5 hover:bg-primary-container transition-colors shadow-[0_0_20px_rgba(244,195,103,0.35)] btn-glow font-bold"
              >
                <span className="material-symbols-outlined text-lg">science</span>
                EXPLORE CAPABILITIES
              </Link>

              <Link
                to="/analytics"
                className="bg-surface-elevated border border-secondary-fixed text-secondary-fixed font-data-mono text-xs sm:text-sm px-8 py-4 rounded-DEFAULT flex items-center justify-center gap-2.5 hover:bg-secondary-fixed/15 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">analytics</span>
                VIEW INTELLIGENCE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Strip Counters */}
      <section className="bg-surface-elevated/85 backdrop-blur-md border-y border-outline-variant py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
            {HERO_STATS.map((stat, idx) => (
              <div key={stat.label} className={`flex flex-col ${idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}>
                <span className="font-label-caps text-[10px] text-slate-muted tracking-widest mb-1.5 uppercase">
                  {stat.label}
                </span>
                <div className={`text-2xl sm:text-3xl md:text-4xl ${stat.color} flex items-baseline`}>
                  <StatCounter target={stat.value} decimal={stat.decimal} suffix={stat.suffix} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview / Core Pillars */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-10">
          <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
            01 // CORE_PILLARS
          </div>
          <h2 className="font-display-lg text-2xl sm:text-3xl font-bold text-on-surface">
            Pioneering Forensic Excellence
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-2">
            Founded in 2008, ForenSolve Experts has grown into a world-renowned forensic consultancy, delivering science-backed evidence analysis and crime pattern intelligence to over 600 agencies across 42 nations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_PILLARS.map((pillar) => (
            <DossierCard
              key={pillar.ref}
              refNo={pillar.ref}
              title={pillar.title}
              className="h-full"
            >
              <div className="space-y-3">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {pillar.icon}
                </span>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </DossierCard>
          ))}
        </div>
      </section>

      {/* Case Intelligence Preview / Active Ransomware Incident Feed */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="font-data-mono text-xs text-slate-muted mb-1 tracking-widest">
              02 // ACTIVE_TELEMETRY_INCIDENT
            </div>
            <h2 className="font-display-lg text-xl sm:text-2xl font-bold text-on-surface">
              Live Investigation Dossier
            </h2>
          </div>
          <Link
            to="/cases"
            className="hidden sm:flex items-center gap-1 font-label-caps text-xs text-primary hover:text-primary-container transition-colors"
          >
            VIEW ALL CASES ({CASE_CATEGORIES.length}) ›
          </Link>
        </div>

        <DossierCard
          refNo="REF_NO: FS-8829"
          badge="LIVE INCIDENT COMPLETE"
          badgeColor="text-evidence-green border-evidence-green/40 bg-evidence-green/10"
          title="CYBERCRIME // ZERO-DAY RANSOMWARE TRACE"
          onClick={() => setActiveDossierModal(true)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge status="ACTIVE" label="ANALYSIS CONCLUDED" />
                <span className="font-data-mono text-xs text-slate-muted">CASE #FS-2048-CYB</span>
              </div>

              <p className="font-body-md text-sm text-on-surface-variant">
                Volatile RAM analysis identified high-privilege kernel driver injection origin in critical banking infrastructure. Cryptographic wallet tracing confirmed attribution to known APT syndicate.
              </p>

              <div className="space-y-2 font-data-mono text-xs bg-surface-elevated/70 p-3.5 border border-outline-variant">
                <div className="flex justify-between border-b border-outline-variant/60 pb-1.5">
                  <span className="text-slate-muted">TARGET NODE:</span>
                  <span className="text-on-surface font-semibold">FINANCIAL_SYS_04.SEC</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/60 pb-1.5">
                  <span className="text-slate-muted">ATTACK VECTORS:</span>
                  <span className="text-tertiary">SPEAR_PHISHING, ZERO_DAY_KERNEL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">ORIGIN ATTRIBUTION:</span>
                  <span className="text-primary">IP_SPOOFED_NODE_7 [TOR_RELAY]</span>
                </div>
              </div>

              <button className="font-label-caps text-xs text-primary flex items-center gap-1.5 pt-2 hover:underline">
                <span className="material-symbols-outlined text-sm">visibility</span>
                INSPECT FULL DIGITAL CHAIN-OF-CUSTODY EXHIBIT
              </button>
            </div>

            {/* Tactical Telemetry Visualizer Box */}
            <div className="border border-outline-variant bg-surface-container-lowest/80 p-5 h-64 relative flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 scan-line pointer-events-none opacity-40"></div>
              <div className="flex justify-between items-center text-slate-muted font-data-mono text-[10px]">
                <span>STREAM: 88.24 KB/S</span>
                <span className="text-evidence-green">PACKET DECRYPT: 100%</span>
              </div>

              {/* Simulated Waveform / Node Graph */}
              <div className="space-y-2 py-4">
                <div className="flex items-center gap-3 font-data-mono text-xs">
                  <span className="w-20 text-slate-muted text-[10px]">NODE_ALPHA</span>
                  <div className="flex-1 bg-surface-dim h-3 relative overflow-hidden border border-outline-variant">
                    <div className="h-full bg-primary/70 w-[78%] animate-pulse"></div>
                  </div>
                  <span className="text-primary text-[10px]">78%</span>
                </div>
                <div className="flex items-center gap-3 font-data-mono text-xs">
                  <span className="w-20 text-slate-muted text-[10px]">NODE_BETA</span>
                  <div className="flex-1 bg-surface-dim h-3 relative overflow-hidden border border-outline-variant">
                    <div className="h-full bg-tertiary/70 w-[92%] animate-pulse"></div>
                  </div>
                  <span className="text-tertiary text-[10px]">92%</span>
                </div>
                <div className="flex items-center gap-3 font-data-mono text-xs">
                  <span className="w-20 text-slate-muted text-[10px]">NODE_GAMMA</span>
                  <div className="flex-1 bg-surface-dim h-3 relative overflow-hidden border border-outline-variant">
                    <div className="h-full bg-evidence-green/70 w-[100%]"></div>
                  </div>
                  <span className="text-evidence-green text-[10px]">100%</span>
                </div>
              </div>

              <div className="flex justify-between items-center font-data-mono text-[10px] text-primary">
                <span>SYSTEM_TRACE: COMPLETE</span>
                <span>NETWORK_MAP_RENDER.SYS</span>
              </div>
            </div>
          </div>
        </DossierCard>
      </section>

      {/* Case Details Modal */}
      <Modal
        isOpen={activeDossierModal}
        onClose={() => setActiveDossierModal(false)}
        title="CASE #FS-2048-CYB // FORENSIC REPORT"
        refNo="DOSSIER: FS-8829"
      >
        <div className="space-y-4">
          <div className="p-3 bg-surface-dim border border-primary/30 text-xs font-data-mono text-primary flex items-center justify-between">
            <span>CHAIN OF CUSTODY: UNBROKEN</span>
            <span>EVIDENCE LOCK: SHA-256 VERIFIED</span>
          </div>

          <h4 className="font-display-lg text-base font-bold text-on-surface">
            Incident Summary & Attribution Findings
          </h4>
          <p className="text-xs leading-relaxed">
            The target financial server cluster experienced unauthorized execution at 03:14 UTC. ForenSolve digital forensic specialists extracted 128GB of volatile RAM and recovered un-wiped memory artifacts containing cryptographic private keys and C2 command structures.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-data-mono pt-2">
            <div className="p-3 bg-surface-dim border border-outline-variant">
              <span className="text-slate-muted block text-[10px]">LEAD ANALYST:</span>
              <span className="text-primary font-bold">James Mitchell</span>
            </div>
            <div className="p-3 bg-surface-dim border border-outline-variant">
              <span className="text-slate-muted block text-[10px]">ADMISSIBILITY:</span>
              <span className="text-evidence-green font-bold">COURT READY (DOJ)</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
