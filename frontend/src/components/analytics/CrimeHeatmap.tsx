import React, { useState } from 'react';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const HOURS = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];

// Generates deterministic simulated incident density based on day & hour
const generateHeatmapData = () => {
  const data: { [key: string]: number } = {};
  DAYS.forEach((day, dIdx) => {
    HOURS.forEach((hour, hIdx) => {
      const hNum = parseInt(hour, 10);
      // Higher activity at night and late week
      const nightBias = (hNum >= 20 || hNum <= 4) ? 0.4 : 0.15;
      const weekendBias = (dIdx >= 4) ? 0.35 : 0.15;
      const pseudoRandom = Math.sin(dIdx * 12 + hIdx * 7) * 0.2 + 0.5;
      const intensity = Math.min(1.0, Math.max(0.05, nightBias + weekendBias + pseudoRandom * 0.4));
      data[`${day}-${hour}`] = Math.round(intensity * 100);
    });
  });
  return data;
};

export const CrimeHeatmap: React.FC = () => {
  const [data] = useState(generateHeatmapData());
  const [hoveredCell, setHoveredCell] = useState<{ day: string; hour: string; count: number } | null>(null);

  const getColor = (val: number) => {
    if (val > 80) return 'bg-[#f4c367] text-black font-bold shadow-[0_0_8px_rgba(244,195,103,0.6)]';
    if (val > 60) return 'bg-[#d6a84f] text-black';
    if (val > 40) return 'bg-[#00c1d5] text-black';
    if (val > 20) return 'bg-[#005281] text-white';
    return 'bg-[#181c21] text-slate-muted';
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-[620px]">
        {/* Heatmap Header (Hours) */}
        <div className="grid grid-cols-[60px_repeat(12,1fr)] gap-1.5 mb-2 font-data-mono text-[11px] text-slate-muted text-center">
          <div className="text-left pl-1">DAY/HR</div>
          {HOURS.map((hour) => (
            <div key={hour} className="py-1 bg-surface-dim border border-outline-variant/30">
              {hour}:00
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-1.5 font-data-mono text-xs">
          {DAYS.map((day) => (
            <div key={day} className="grid grid-cols-[60px_repeat(12,1fr)] gap-1.5 items-center">
              <div className="text-left font-bold text-on-surface-variant text-[11px] pl-1 tracking-wider">
                {day}
              </div>
              {HOURS.map((hour) => {
                const count = data[`${day}-${hour}`] || 0;
                return (
                  <div
                    key={`${day}-${hour}`}
                    onMouseEnter={() => setHoveredCell({ day, hour, count })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`h-8 flex items-center justify-center border border-outline-variant/40 transition-all duration-150 cursor-crosshair text-[10px] ${getColor(
                      count
                    )} hover:scale-110 hover:z-10 hover:border-white`}
                  >
                    {count}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Dynamic Telemetry Legend & Hover Info */}
        <div className="mt-5 pt-3 border-t border-outline-variant/50 flex flex-wrap items-center justify-between gap-4 font-data-mono text-[11px] text-slate-muted">
          <div className="flex items-center gap-2">
            <span>DENSITY:</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#181c21] border border-outline-variant inline-block"></span>
              <span className="text-[10px] mr-2">&lt;20</span>
              <span className="w-3 h-3 bg-[#005281] inline-block"></span>
              <span className="text-[10px] mr-2">20-40</span>
              <span className="w-3 h-3 bg-[#00c1d5] inline-block"></span>
              <span className="text-[10px] mr-2">40-60</span>
              <span className="w-3 h-3 bg-[#d6a84f] inline-block"></span>
              <span className="text-[10px] mr-2">60-80</span>
              <span className="w-3 h-3 bg-[#f4c367] inline-block"></span>
              <span className="text-[10px]">80+ PEAK</span>
            </div>
          </div>

          <div className="text-primary font-bold">
            {hoveredCell ? (
              <span>
                SECTOR INSPECT: {hoveredCell.day} @ {hoveredCell.hour}:00 HRS → {hoveredCell.count} INCIDENTS/HR
              </span>
            ) : (
              <span>HOVER CELL TO DRILL DOWN TIMEFRAME</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
