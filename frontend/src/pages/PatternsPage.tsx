import React from 'react';
import { CrimeHeatmap } from '../components/analytics/CrimeHeatmap';
import { CorrelationMatrix } from '../components/analytics/CorrelationMatrix';
import { HOTSPOT_ZONES } from '../data/forensicData';
import { DossierCard } from '../components/ui/DossierCard';
import { StatusBadge } from '../components/ui/StatusBadge';

export const PatternsPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
          06 // PATTERN_CORRELATION
        </div>
        <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          Crime Pattern Correlation
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          Our AI correlation engine analyzes multi-source incident registries, temporal density heatmaps, and inter-category correlations to expose organized crime syndicates and anticipate threat trajectories.
        </p>
      </div>

      {/* Heatmap Section */}
      <DossierCard
        refNo="MATRIX: HEAT-24H"
        badge="REAL-TIME DENSITY"
        badgeColor="text-primary border-primary/30 bg-primary/10"
        title="Crime Frequency Heatmap (24h Temporal Density)"
        interactive={false}
      >
        <div className="mb-4 text-xs font-body-md text-on-surface-variant">
          Incident density mapped across hour of day vs day of week. Darker amber blocks indicate concentrated peaks in criminal telemetry.
        </div>
        <CrimeHeatmap />
      </DossierCard>

      {/* Correlation Matrix and Hotspots Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Correlation Matrix */}
        <DossierCard
          refNo="CORR: COEFF-06"
          badge="AI PEARSON r"
          badgeColor="text-tertiary border-tertiary/30 bg-tertiary/10"
          title="Crime Type Cross-Correlation Matrix"
          interactive={false}
          className="h-full"
        >
          <div className="mb-4 text-xs font-body-md text-on-surface-variant">
            Pairwise correlation coefficients across primary criminal domains. Higher coefficients indicate frequent co-occurrence within the same syndicate networks.
          </div>
          <CorrelationMatrix />
        </DossierCard>

        {/* Top Hotspots */}
        <DossierCard
          refNo="ZONES: HOTSPOT-5"
          badge="SPATIAL GEOGRAPHIC"
          badgeColor="text-evidence-green border-evidence-green/30 bg-evidence-green/10"
          title="Top Crime Hotspot Zones"
          interactive={false}
          className="h-full flex flex-col justify-between"
        >
          <div className="mb-4 text-xs font-body-md text-on-surface-variant">
            Geographic incident clusters prioritized by composite threat index, casualty probability, and repeat offense velocity.
          </div>

          <div className="space-y-3">
            {HOTSPOT_ZONES.map((zone) => (
              <div
                key={zone.rank}
                className="p-3.5 bg-surface-elevated/70 border border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-DEFAULT bg-primary/15 border border-primary/40 flex items-center justify-center font-display-lg font-bold text-primary text-sm shrink-0">
                    #{zone.rank}
                  </div>
                  <div>
                    <div className="font-headline-md text-sm font-semibold text-on-surface">
                      {zone.name}
                    </div>
                    <div className="font-data-mono text-[11px] text-slate-muted">
                      {zone.dominantTypes}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:text-right font-data-mono text-xs shrink-0">
                  <div>
                    <div className="text-primary font-bold">{zone.incidents} INCIDENTS</div>
                    <div className="text-[10px] text-slate-muted">{zone.coordinates}</div>
                  </div>
                  <StatusBadge
                    status={zone.riskLevel === 'Critical' ? 'CRITICAL' : 'ACTIVE'}
                    label={zone.riskLevel}
                  />
                </div>
              </div>
            ))}
          </div>
        </DossierCard>
      </div>
    </div>
  );
};
