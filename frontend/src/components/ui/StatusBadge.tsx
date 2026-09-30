import React from 'react';

interface StatusBadgeProps {
  status: 'ONLINE' | 'ACTIVE' | 'RESOLVED' | 'CRITICAL' | 'ELEVATED' | 'PENDING';
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
  const getStyle = () => {
    switch (status) {
      case 'ONLINE':
      case 'ACTIVE':
      case 'RESOLVED':
        return {
          dotColor: 'bg-evidence-green',
          textColor: 'text-evidence-green',
          borderColor: 'border-evidence-green/30 bg-evidence-green/10',
          pulse: 'status-pulse',
        };
      case 'CRITICAL':
        return {
          dotColor: 'bg-critical-red',
          textColor: 'text-critical-red',
          borderColor: 'border-critical-red/30 bg-critical-red/10',
          pulse: 'status-pulse-red',
        };
      case 'ELEVATED':
      case 'PENDING':
        return {
          dotColor: 'bg-primary',
          textColor: 'text-primary',
          borderColor: 'border-primary/30 bg-primary/10',
          pulse: 'status-pulse',
        };
      default:
        return {
          dotColor: 'bg-slate-muted',
          textColor: 'text-slate-muted',
          borderColor: 'border-slate-muted/30 bg-slate-muted/10',
          pulse: '',
        };
    }
  };

  const style = getStyle();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-data-mono text-[11px] border tracking-wider uppercase ${style.borderColor} ${style.textColor} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dotColor} ${style.pulse}`} />
      <span>{label || status}</span>
    </span>
  );
};
