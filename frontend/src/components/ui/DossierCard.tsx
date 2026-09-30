import React from 'react';

interface DossierCardProps {
  refNo?: string;
  badge?: string;
  badgeColor?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const DossierCard: React.FC<DossierCardProps> = ({
  refNo,
  badge,
  badgeColor = 'text-evidence-green border-evidence-green/30 bg-evidence-green/10',
  title,
  subtitle,
  children,
  className = '',
  onClick,
  interactive = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative border border-outline-variant bg-surface-dim/80 backdrop-blur-md transition-all duration-300 ${
        interactive
          ? 'hover:border-primary/50 hover:bg-surface-elevated/90 hover:shadow-[0_4px_24px_rgba(0,0,0,0.6)] cursor-pointer card-scan group'
          : ''
      } ${className}`}
    >
      {/* Top Accent Gradient Border on Hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-tertiary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header bar if refNo or badge or title present */}
      {(refNo || badge || title) && (
        <div className="bg-surface-container-lowest/80 border-b border-outline-variant px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {refNo && (
              <span className="font-label-caps text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 tracking-wider shrink-0">
                {refNo}
              </span>
            )}
            {title && (
              <span className="font-headline-md text-xs sm:text-sm font-semibold text-on-surface truncate">
                {title}
              </span>
            )}
          </div>
          {badge && (
            <span
              className={`font-data-mono text-[10px] tracking-wider px-2 py-0.5 border ${badgeColor} shrink-0 uppercase`}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Subtitle if present */}
      {subtitle && (
        <div className="px-5 pt-3 text-xs text-slate-muted font-data-mono uppercase tracking-wider">
          {subtitle}
        </div>
      )}

      {/* Content */}
      <div className="p-5">{children}</div>

      {/* Corner Technical Bracket Accents */}
      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-primary/60 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-primary/60 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
