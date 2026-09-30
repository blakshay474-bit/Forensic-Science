import React, { useState } from 'react';
import { MODUS_OPERANDI_CATEGORIES, ModusOperandi } from '../data/forensicData';
import { DossierCard } from '../components/ui/DossierCard';
import { RadarChart } from '../components/analytics/RadarChart';
import { Modal } from '../components/ui/Modal';

export const ModusOperandiPage: React.FC = () => {
  const [selectedMO, setSelectedMO] = useState<ModusOperandi | null>(null);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
          04 // BEHAVIORAL_CRIMINOLOGY
        </div>
        <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          Modus Operandi Analysis
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          Understanding the behavioral psychology, operational execution, and anti-forensic methodology of perpetrators is critical to proactive intervention and forensic cross-correlation.
        </p>
      </div>

      {/* Hero Interactive Radar Overview */}
      <div className="border border-outline-variant bg-surface-dim/80 backdrop-blur-md p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block px-2.5 py-1 bg-surface-elevated border border-tertiary/40 font-data-mono text-xs text-tertiary">
              MO_RADAR_ENGINE // REAL-TIME PROFILE MAPPER
            </div>
            <h2 className="font-display-lg text-xl sm:text-2xl font-bold text-on-surface">
              Multi-Dimensional Offender Profiling
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Our AI engine correlates 6 distinct behavioral vectors across incoming intelligence streams—quantifying planning depth, technological sophistication, residual forensic footprints, and cross-border mobility.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-data-mono text-xs">
              <div className="p-2.5 bg-surface-elevated border border-outline-variant">
                <span className="text-slate-muted block text-[10px]">AVG PLANNING:</span>
                <span className="text-primary font-bold">HIGH (88%)</span>
              </div>
              <div className="p-2.5 bg-surface-elevated border border-outline-variant">
                <span className="text-slate-muted block text-[10px]">CYBER COMPLEXITY:</span>
                <span className="text-tertiary font-bold">SEVERE (92%)</span>
              </div>
              <div className="p-2.5 bg-surface-elevated border border-outline-variant col-span-2 sm:col-span-1">
                <span className="text-slate-muted block text-[10px]">REPEAT OFFENSE:</span>
                <span className="text-evidence-green font-bold">ELEVATED (78%)</span>
              </div>
            </div>
          </div>

          {/* Radar Visualization */}
          <div className="flex justify-center bg-surface-elevated/40 p-4 border border-outline-variant/60">
            <RadarChart size={240} color="#f4c367" />
          </div>
        </div>
      </div>

      {/* 6 MO Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODUS_OPERANDI_CATEGORIES.map((mo) => (
          <DossierCard
            key={mo.id}
            refNo={mo.index}
            badge={mo.riskRating}
            badgeColor={mo.riskColor}
            title={mo.title}
            onClick={() => setSelectedMO(mo)}
            className="flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="font-data-mono text-[11px] text-tertiary border-l-2 border-tertiary pl-2.5">
                {mo.tag}
              </div>

              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                {mo.description}
              </p>

              <div className="space-y-1.5 pt-2">
                <div className="font-label-caps text-[10px] text-slate-muted">BEHAVIORAL TRAITS:</div>
                <ul className="space-y-1 text-xs font-data-mono text-slate-muted">
                  {mo.behavioralTraits.slice(0, 2).map((trait, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] truncate">
                      <span className="text-primary">›</span> {trait}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-outline-variant/60 flex items-center justify-between font-label-caps text-xs text-primary">
              <span>DETECTION: {mo.detectionDifficulty}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </DossierCard>
        ))}
      </div>

      {/* MO Modal */}
      {selectedMO && (
        <Modal
          isOpen={!!selectedMO}
          onClose={() => setSelectedMO(null)}
          title={selectedMO.title}
          refNo={selectedMO.index}
        >
          <div className="space-y-6">
            <div className="p-3 bg-surface-dim border border-outline-variant flex justify-between items-center text-xs font-data-mono">
              <span className="text-primary font-bold">PROFILE: {selectedMO.tag}</span>
              <span className="text-critical-red">DIFFICULTY: {selectedMO.detectionDifficulty}</span>
            </div>

            <div>
              <h4 className="font-label-caps text-xs text-slate-muted uppercase mb-2">
                Psychological & Tactical Description
              </h4>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                {selectedMO.description}
              </p>
            </div>

            <div className="p-4 bg-surface-dim border border-outline-variant">
              <h5 className="font-label-caps text-xs text-primary uppercase mb-2">
                Signature Behavioral Traits
              </h5>
              <ul className="space-y-2 text-xs font-data-mono text-on-surface-variant">
                {selectedMO.behavioralTraits.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">›</span> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-surface-dim border border-outline-variant">
              <h5 className="font-label-caps text-xs text-tertiary uppercase mb-2">
                Forensic Counter-Measures & Interventions
              </h5>
              <ul className="space-y-2 text-xs font-data-mono text-on-surface-variant">
                {selectedMO.counterMeasures.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-tertiary">›</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
