import React, { useState } from 'react';
import { CORRELATION_MATRIX } from '../../data/forensicData';

export const CorrelationMatrix: React.FC = () => {
  const [selected, setSelected] = useState<{ row: number; col: number; val: number } | null>(null);
  const { crimeTypes, matrix } = CORRELATION_MATRIX;

  const getCellBg = (val: number) => {
    if (val === 1.0) return 'bg-primary/20 text-primary border-primary/50 font-bold';
    if (val >= 0.7) return 'bg-[#f4c367]/30 text-primary border-primary/40 font-bold';
    if (val >= 0.4) return 'bg-[#00c1d5]/25 text-tertiary border-tertiary/40';
    if (val >= 0.2) return 'bg-[#005281]/30 text-secondary border-secondary/30';
    return 'bg-surface-dim/80 text-slate-muted border-outline-variant/30';
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-[580px]">
        {/* Top Header Row */}
        <div className="grid grid-cols-[110px_repeat(6,1fr)] gap-1.5 mb-2 font-data-mono text-[11px] text-center">
          <div className="text-left pl-2 text-slate-muted font-label-caps">CORRELATION</div>
          {crimeTypes.map((type) => (
            <div
              key={type}
              className="py-1 bg-surface-dim border border-outline-variant/40 text-on-surface truncate px-1 text-[11px]"
              title={type}
            >
              {type}
            </div>
          ))}
        </div>

        {/* Matrix Rows */}
        <div className="space-y-1.5 font-data-mono text-xs">
          {crimeTypes.map((rowType, rIdx) => (
            <div key={rowType} className="grid grid-cols-[110px_repeat(6,1fr)] gap-1.5 items-center">
              <div
                className="text-left font-bold text-on-surface-variant text-[11px] pl-2 truncate"
                title={rowType}
              >
                {rowType}
              </div>
              {matrix[rIdx].map((val, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onMouseEnter={() => setSelected({ row: rIdx, col: cIdx, val })}
                  onMouseLeave={() => setSelected(null)}
                  className={`h-9 flex items-center justify-center border transition-all duration-150 cursor-pointer text-xs ${getCellBg(
                    val
                  )} hover:scale-105 hover:z-10 hover:border-white shadow-sm`}
                >
                  {val.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Telemetry Indicator */}
        <div className="mt-5 pt-3 border-t border-outline-variant/50 flex items-center justify-between font-data-mono text-[11px]">
          <div className="flex items-center gap-3 text-slate-muted">
            <span>COEFFICIENT SCALE:</span>
            <span className="text-secondary">0.0 (UNCORRELATED)</span>
            <span>→</span>
            <span className="text-tertiary">0.5 (MODERATE)</span>
            <span>→</span>
            <span className="text-primary font-bold">1.0 (IDENTICAL / HIGH)</span>
          </div>

          <div className="text-primary">
            {selected ? (
              <span>
                {crimeTypes[selected.row]} ↔ {crimeTypes[selected.col]} = r({selected.val.toFixed(2)})
              </span>
            ) : (
              <span className="text-slate-muted">HOVER TO EXAMINE PAIRWISE CORRELATION</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
