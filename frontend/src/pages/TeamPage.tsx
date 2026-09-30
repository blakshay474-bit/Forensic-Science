import React from 'react';
import { TEAM_MEMBERS, TESTIMONIALS } from '../data/forensicData';
import { DossierCard } from '../components/ui/DossierCard';
import { Link } from 'react-router-dom';

export const TeamPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-16 pb-20">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
          07 // SCIENTIFIC_CORPS
        </div>
        <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          Meet the ForenSolve Team
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          Our multidisciplinary leadership team combines over 70 years of collective operational forensics, federal investigation, academic research, and sworn expert witness testimony.
        </p>
      </div>

      {/* Team Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TEAM_MEMBERS.map((member) => (
          <DossierCard
            key={member.id}
            refNo={`EXPERT_${member.initials}`}
            badge={`${member.experienceYears} YRS EXP`}
            badgeColor="text-primary border-primary/30 bg-primary/10"
            title={member.name}
            interactive={false}
            className="flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-surface-elevated border border-primary/40 flex items-center justify-center font-display-lg font-bold text-primary text-xl shadow-[0_0_15px_rgba(244,195,103,0.15)] shrink-0">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display-lg text-lg font-bold text-on-surface">
                    {member.name}
                  </h3>
                  <div className="font-data-mono text-xs text-primary font-semibold">
                    {member.role}
                  </div>
                  <div className="font-data-mono text-[11px] text-slate-muted">
                    {member.credentials}
                  </div>
                </div>
              </div>

              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {member.bio}
              </p>

              <div className="space-y-1.5 pt-2">
                <div className="font-label-caps text-[10px] text-slate-muted">SPECIALIZATIONS:</div>
                <div className="flex flex-wrap gap-1.5">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 bg-surface-dim border border-outline-variant text-[10px] font-data-mono text-tertiary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-outline-variant/60 flex items-center justify-between font-data-mono text-xs text-slate-muted">
              <span>{member.publicationsCount} PEER PUBLICATIONS</span>
              <Link
                to="/contact"
                className="text-primary hover:underline font-label-caps text-[11px] flex items-center gap-1"
              >
                REQUEST CONSULTATION ›
              </Link>
            </div>
          </DossierCard>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="space-y-8 pt-6">
        <div className="border-b border-outline-variant pb-4">
          <div className="font-data-mono text-xs text-slate-muted mb-1">// CLIENT_TESTIMONIALS</div>
          <h2 className="font-display-lg text-2xl font-bold text-on-surface">
            Trusted by Elite Law Enforcement & Legal Counsels
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-6 bg-surface-dim/80 border border-outline-variant flex flex-col justify-between space-y-6 relative group hover:border-primary/40 transition-colors"
            >
              <div className="space-y-4">
                <span className="font-data-mono text-[10px] text-primary border border-primary/30 bg-primary/10 px-2 py-0.5 inline-block">
                  {test.badge}
                </span>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/60">
                <div className="w-9 h-9 bg-surface-elevated border border-outline-variant flex items-center justify-center font-display-lg font-bold text-xs text-secondary shrink-0">
                  {test.initials}
                </div>
                <div>
                  <div className="font-display-lg text-xs font-bold text-on-surface">
                    {test.author}
                  </div>
                  <div className="font-data-mono text-[10px] text-slate-muted">
                    {test.designation}, {test.organization}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
