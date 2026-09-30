import React, { useState, useEffect } from 'react';
import { CaseCategory } from '../data/forensicData';
import { DossierCard } from '../components/ui/DossierCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import { forensicApi } from '../services/api';

export const CasesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<string>('ALL');
  const [selectedCase, setSelectedCase] = useState<CaseCategory | null>(null);
  const [cases, setCases] = useState<CaseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    forensicApi.getCases({ q: searchQuery, threat: selectedThreat })
      .then((data) => {
        if (isMounted) {
          setCases(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching cases:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedThreat]);

  const filteredCases = cases;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
          03 // INVESTIGATION_DOMAINS
        </div>
        <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          Types of Cases We Handle
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          Our senior examiners and intelligence analysts possess comprehensive cross-discipline experience across all primary categories of criminal, federal, and multi-jurisdictional forensic investigations.
        </p>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div className="md:col-span-2 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-muted text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search case categories, tags, or forensic vectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface placeholder:text-slate-muted font-data-mono text-xs focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-label-caps text-xs text-slate-muted shrink-0">THREAT:</span>
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((threat) => (
              <button
                key={threat}
                onClick={() => setSelectedThreat(threat)}
                className={`font-label-caps text-[11px] px-3 py-2 border flex-1 transition-all ${
                  selectedThreat === threat
                    ? 'bg-primary text-black border-primary font-bold shadow-[0_0_10px_rgba(244,195,103,0.3)]'
                    : 'bg-surface-dim text-on-surface-variant border-outline-variant hover:border-primary/40'
                }`}
              >
                {threat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 font-data-mono text-slate-muted">
          <span className="material-symbols-outlined text-3xl text-primary animate-spin">sync</span>
          <div className="text-xs tracking-widest uppercase">FETCHING FORENSIC CASE DOSSIERS FROM API...</div>
        </div>
      ) : filteredCases.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-outline-variant p-8 font-data-mono text-slate-muted">
          <span className="material-symbols-outlined text-4xl mb-2 text-tertiary">search_off</span>
          <div>NO MATCHING FORENSIC CASE CATEGORIES FOUND</div>
          <div className="text-xs text-slate-muted mt-1">Try adjusting threat level or search keywords</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <DossierCard
              key={caseItem.id}
              refNo={caseItem.code}
              badge={`${caseItem.casesAnalyzed} CASES`}
              badgeColor="text-primary border-primary/30 bg-primary/10"
              title={caseItem.title}
              onClick={() => setSelectedCase(caseItem)}
              className="flex flex-col justify-between h-full"
            >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StatusBadge
                  status={caseItem.threatLevel === 'Critical' ? 'CRITICAL' : 'ACTIVE'}
                  label={`THREAT: ${caseItem.threatLevel}`}
                />
                <span className="font-data-mono text-[10px] text-slate-muted">
                  LEAD: {caseItem.leadAnalyst}
                </span>
              </div>

              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                {caseItem.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {caseItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-surface-dim border border-outline-variant text-[10px] font-data-mono text-secondary-fixed hover:border-secondary-fixed/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-outline-variant/60 flex items-center justify-between font-label-caps text-xs text-primary">
              <span>{caseItem.sampleCaseRef}</span>
              <span className="flex items-center gap-1">
                VIEW DOSSIER <span className="material-symbols-outlined text-sm">open_in_new</span>
              </span>
            </div>
          </DossierCard>
        ))}
      </div>
      )}

      {/* Case Modal */}
      {selectedCase && (
        <Modal
          isOpen={!!selectedCase}
          onClose={() => setSelectedCase(null)}
          title={selectedCase.title}
          refNo={selectedCase.code}
        >
          <div className="space-y-6">
            <div className="p-3 bg-surface-dim border border-outline-variant flex justify-between items-center text-xs font-data-mono">
              <span className="text-primary font-bold">TOTAL ANALYZED: {selectedCase.casesAnalyzed}</span>
              <span className="text-slate-muted">PRINCIPAL EXAMINER: {selectedCase.leadAnalyst}</span>
            </div>

            <div>
              <h4 className="font-label-caps text-xs text-slate-muted uppercase mb-2">
                Domain Description
              </h4>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                {selectedCase.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-surface-dim border border-outline-variant">
                <h5 className="font-label-caps text-xs text-tertiary uppercase mb-2">
                  Key Vector Profiling
                </h5>
                <ul className="space-y-1.5 text-xs font-data-mono text-on-surface-variant">
                  {selectedCase.keyVectors.map((v, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-tertiary">›</span> {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-surface-dim border border-outline-variant">
                <h5 className="font-label-caps text-xs text-primary uppercase mb-2">
                  Primary Evidence Types
                </h5>
                <ul className="space-y-1.5 text-xs font-data-mono text-on-surface-variant">
                  {selectedCase.evidenceTypes.map((e, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-primary">›</span> {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
