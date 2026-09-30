import React, { useState } from 'react';
import { FORENSIC_SERVICES, ForensicService } from '../data/forensicData';
import { DossierCard } from '../components/ui/DossierCard';
import { Modal } from '../components/ui/Modal';

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ForensicService | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredServices = FORENSIC_SERVICES.filter((svc) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'DIGITAL') return svc.id === 'digital-cyber' || svc.id === 'biometrics';
    if (activeFilter === 'BIOLOGICAL') return svc.id === 'dna-biological' || svc.id === 'toxicology-chem';
    if (activeFilter === 'PHYSICAL') return svc.id === 'crime-scene-recon' || svc.id === 'document-handwriting';
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
          02 // SCIENTIFIC_CAPABILITIES
        </div>
        <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          Comprehensive Forensic Services
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          From multi-spectral latent fingerprint processing to 3D LiDAR spatial crime scene reconstruction, our ISO 17025 accredited laboratory delivers peer-reviewed, courtroom-ready forensic intelligence.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          <span className="font-label-caps text-xs text-slate-muted mr-2">DISCIPLINE:</span>
          {['ALL', 'DIGITAL', 'BIOLOGICAL', 'PHYSICAL'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-label-caps text-xs px-3.5 py-1.5 border transition-all ${
                activeFilter === filter
                  ? 'bg-primary text-black border-primary font-bold shadow-[0_0_12px_rgba(244,195,103,0.35)]'
                  : 'bg-surface-dim text-on-surface-variant border-outline-variant hover:border-primary/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <DossierCard
            key={service.id}
            refNo={service.refNo}
            badge={service.turnaroundAvg}
            badgeColor="text-tertiary border-tertiary/30 bg-tertiary/10"
            title={service.title}
            onClick={() => setSelectedService(service)}
            className="flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-surface-elevated border border-outline-variant text-primary">
                  <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                </div>
                <div className="font-data-mono text-xs text-primary font-semibold">
                  {service.tagline}
                </div>
              </div>

              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                {service.description}
              </p>

              {/* Technologies Pills */}
              <div className="space-y-1.5 pt-2">
                <div className="font-label-caps text-[10px] text-slate-muted">INSTRUMENTATION:</div>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-surface-elevated border border-outline-variant text-[10px] font-data-mono text-slate-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-data-mono text-primary">
                      +{service.technologies.length - 3} MORE
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-outline-variant/60 flex items-center justify-between font-label-caps text-xs text-primary">
              <span>INSPECT CAPABILITY SPEC</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </DossierCard>
        ))}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          refNo={selectedService.refNo}
        >
          <div className="space-y-6">
            <div className="p-3 bg-surface-dim border border-primary/30 flex flex-wrap items-center justify-between gap-3 text-xs font-data-mono">
              <span className="text-primary font-bold">AVG TURNAROUND: {selectedService.turnaroundAvg}</span>
              <span className="text-evidence-green">{selectedService.courtroomAdmissibility}</span>
            </div>

            <div>
              <h4 className="font-label-caps text-xs text-slate-muted uppercase mb-2">
                Operational Overview
              </h4>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            <div>
              <h4 className="font-label-caps text-xs text-slate-muted uppercase mb-2">
                Core Investigative Capabilities
              </h4>
              <ul className="space-y-2 text-xs font-data-mono text-on-surface-variant">
                {selectedService.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">›</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-label-caps text-xs text-slate-muted uppercase mb-2">
                Standard Laboratory Instrumentation
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-data-mono">
                {selectedService.technologies.map((tech) => (
                  <div key={tech} className="p-2.5 bg-surface-dim border border-outline-variant text-slate-muted">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
