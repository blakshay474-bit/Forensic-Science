import React, { useState } from 'react';
import { TrendChart } from '../components/analytics/TrendChart';
import { RadarChart } from '../components/analytics/RadarChart';
import { DossierCard } from '../components/ui/DossierCard';
import { StatCounter } from '../components/ui/StatCounter';
import { CASE_CATEGORIES } from '../data/forensicData';

export const AnalyticsPage: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24H' | '30D' | '1Y' | 'ALL'>('1Y');

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
            05 // TELEMETRY_ENGINE
          </div>
          <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-on-surface mb-3">
            Crime Analytics Dashboard
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
            Real-time forensic analytics powered by our proprietary crime intelligence engine, processing data from thousands of forensic investigations globally.
          </p>
        </div>

        {/* Timeframe Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-dim border border-outline-variant">
          {(['24H', '30D', '1Y', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`font-label-caps text-xs px-3 py-1.5 transition-all ${
                selectedTimeframe === tf
                  ? 'bg-primary text-black font-bold shadow-[0_0_8px_rgba(244,195,103,0.4)]'
                  : 'text-slate-muted hover:text-on-surface'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-surface-dim border border-outline-variant relative">
          <span className="material-symbols-outlined text-primary text-2xl mb-2">science</span>
          <div className="font-label-caps text-[10px] text-slate-muted uppercase tracking-wider mb-1">
            Total Cases Analyzed
          </div>
          <div className="text-2xl sm:text-3xl font-data-mono font-bold text-primary">
            <StatCounter target={14950} suffix="+" />
          </div>
          <div className="text-[10px] font-data-mono text-evidence-green mt-2 flex items-center gap-1">
            <span>▲ +14.2%</span> YoY Volume
          </div>
        </div>

        <div className="p-5 bg-surface-dim border border-outline-variant relative">
          <span className="material-symbols-outlined text-evidence-green text-2xl mb-2">check_circle</span>
          <div className="font-label-caps text-[10px] text-slate-muted uppercase tracking-wider mb-1">
            Resolution Rate
          </div>
          <div className="text-2xl sm:text-3xl font-data-mono font-bold text-evidence-green">
            <StatCounter target={99.2} decimal suffix="%" />
          </div>
          <div className="text-[10px] font-data-mono text-slate-muted mt-2">
            Daubert Court Admissibility
          </div>
        </div>

        <div className="p-5 bg-surface-dim border border-outline-variant relative">
          <span className="material-symbols-outlined text-tertiary text-2xl mb-2">bolt</span>
          <div className="font-label-caps text-[10px] text-slate-muted uppercase tracking-wider mb-1">
            Avg. Turnaround
          </div>
          <div className="text-2xl sm:text-3xl font-data-mono font-bold text-tertiary">
            <StatCounter target={28.4} decimal suffix="h" />
          </div>
          <div className="text-[10px] font-data-mono text-evidence-green mt-2 flex items-center gap-1">
            <span>▼ -6.8h</span> Faster than Federal Std
          </div>
        </div>

        <div className="p-5 bg-surface-dim border border-outline-variant relative">
          <span className="material-symbols-outlined text-secondary text-2xl mb-2">public</span>
          <div className="font-label-caps text-[10px] text-slate-muted uppercase tracking-wider mb-1">
            Countries Coverage
          </div>
          <div className="text-2xl sm:text-3xl font-data-mono font-bold text-secondary">
            <StatCounter target={42} suffix=" NATIONS" />
          </div>
          <div className="text-[10px] font-data-mono text-slate-muted mt-2">
            600+ Partner Agencies
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crime Trend Analysis (2 cols) */}
        <DossierCard
          refNo="CHART: TREND-01"
          badge="HISTORICAL CLEARANCE"
          badgeColor="text-primary border-primary/30 bg-primary/10"
          title="Crime Trend Analysis & Resolution by Year"
          className="lg:col-span-2"
          interactive={false}
        >
          <TrendChart timeframe={selectedTimeframe} />
        </DossierCard>

        {/* Modus Operandi Radar (1 col) */}
        <DossierCard
          refNo="RADAR: MO-02"
          badge="AI BEHAVIOR PROFILE"
          badgeColor="text-tertiary border-tertiary/30 bg-tertiary/10"
          title="Modus Operandi Threat Vectors"
          className="flex flex-col justify-between"
          interactive={false}
        >
          <div className="py-2 flex justify-center">
            <RadarChart size={230} color="#00dff6" />
          </div>
          <div className="p-3 bg-surface-dim border border-outline-variant/60 font-data-mono text-xs text-slate-muted mt-4">
            <span className="text-tertiary font-bold">INSIGHT:</span> Cybercrime complexity and cross-jurisdictional velocity represent fastest growing risk factors.
          </div>
        </DossierCard>
      </div>

      {/* Case Distribution Breakdown Row */}
      <div className="border border-outline-variant bg-surface-dim/70 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-data-mono text-xs text-slate-muted mb-1">// VOLUME BREAKDOWN</div>
            <h3 className="font-display-lg text-lg font-bold text-on-surface">
              Case Intake Distribution by Category
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {CASE_CATEGORIES.map((cat) => {
            const total = 14950;
            const percentage = ((cat.casesCount / total) * 100).toFixed(1);
            return (
              <div key={cat.id} className="space-y-1.5 font-data-mono text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-on-surface font-semibold">{cat.title}</span>
                  <span className="text-primary">{cat.casesCount.toLocaleString()} cases ({percentage}%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2.5 border border-outline-variant/60 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-tertiary transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
