import React, { useState, useEffect } from 'react';
import { ANNUAL_RESOLUTION_DATA } from '../../data/forensicData';
import { forensicApi } from '../../services/api';

interface TrendChartProps {
  timeframe?: '24H' | '30D' | '1Y' | 'ALL';
}

export const TrendChart: React.FC<TrendChartProps> = ({ timeframe = '1Y' }) => {
  const [activeMetric, setActiveMetric] = useState<'total' | 'resolved' | 'rate'>('resolved');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState(ANNUAL_RESOLUTION_DATA);

  useEffect(() => {
    let isMounted = true;
    forensicApi.getTrends(timeframe)
      .then((trends) => {
        if (isMounted && trends && trends.length > 0) {
          const mapped = trends.map((t) => ({
            year: t.period,
            total: t.intake,
            resolved: t.solved,
            rate: Math.min(100, Math.round((t.solved / (t.intake || 1)) * 100))
          }));
          setChartData(mapped);
        }
      })
      .catch(() => {
        if (isMounted) setChartData(ANNUAL_RESOLUTION_DATA);
      });

    return () => {
      isMounted = false;
    };
  }, [timeframe]);

  const maxVal = Math.max(...chartData.map((d) => d.total), 1);
  const height = 200;
  const width = 500;
  const padding = 40;

  const points = chartData.map((d, i) => {
    const divisor = chartData.length > 1 ? chartData.length - 1 : 1;
    const x = padding + (i / divisor) * (width - padding * 2);
    const val = activeMetric === 'rate'
      ? (d.rate / 100) * (height - padding * 2)
      : (d[activeMetric] / maxVal) * (height - padding * 2);
    const y = height - padding - val;
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // Smooth bezier curves
    const prev = points[i - 1];
    const cp1x = prev.x + (p.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (p.x - prev.x) / 2;
    const cp2y = p.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="w-full">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-outline-variant">
        <div className="font-label-caps text-xs text-slate-muted">METRIC FILTER:</div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveMetric('resolved')}
            className={`font-data-mono text-xs px-3 py-1 border transition-all ${
              activeMetric === 'resolved'
                ? 'bg-primary text-black border-primary font-bold shadow-[0_0_10px_rgba(244,195,103,0.4)]'
                : 'bg-surface-dim text-on-surface-variant border-outline-variant hover:border-primary/50'
            }`}
          >
            CASES RESOLVED
          </button>
          <button
            onClick={() => setActiveMetric('total')}
            className={`font-data-mono text-xs px-3 py-1 border transition-all ${
              activeMetric === 'total'
                ? 'bg-tertiary text-black border-tertiary font-bold shadow-[0_0_10px_rgba(0,223,246,0.4)]'
                : 'bg-surface-dim text-on-surface-variant border-outline-variant hover:border-tertiary/50'
            }`}
          >
            TOTAL INTAKE
          </button>
          <button
            onClick={() => setActiveMetric('rate')}
            className={`font-data-mono text-xs px-3 py-1 border transition-all ${
              activeMetric === 'rate'
                ? 'bg-evidence-green text-black border-evidence-green font-bold shadow-[0_0_10px_rgba(67,160,71,0.4)]'
                : 'bg-surface-dim text-on-surface-variant border-outline-variant hover:border-evidence-green/50'
            }`}
          >
            CLEARANCE RATE %
          </button>
        </div>
      </div>

      {/* SVG Chart Canvas */}
      <div className="relative w-full h-[220px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="primaryAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4c367" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f4c367" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="tertiaryAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00dff6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00dff6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="greenAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#43A047" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#43A047" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1.0].map((ratio, i) => {
            const y = height - padding - ratio * (height - padding * 2);
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#31353b"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
            );
          })}

          {/* Fill area */}
          <path
            d={areaD}
            fill={
              activeMetric === 'resolved'
                ? 'url(#primaryAreaGrad)'
                : activeMetric === 'total'
                ? 'url(#tertiaryAreaGrad)'
                : 'url(#greenAreaGrad)'
            }
          />

          {/* Stroke path */}
          <path
            d={pathD}
            fill="none"
            stroke={
              activeMetric === 'resolved'
                ? '#f4c367'
                : activeMetric === 'total'
                ? '#00dff6'
                : '#43A047'
            }
            strokeWidth="2.5"
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === i ? 6 : 4}
                className={`cursor-pointer transition-all ${
                  activeMetric === 'resolved'
                    ? 'fill-primary stroke-[#101419]'
                    : activeMetric === 'total'
                    ? 'fill-tertiary stroke-[#101419]'
                    : 'fill-evidence-green stroke-[#101419]'
                }`}
                strokeWidth="2"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* X-axis year labels */}
              <text
                x={p.x}
                y={height - 15}
                textAnchor="middle"
                className="fill-slate-muted font-data-mono text-[10px]"
              >
                {p.data.year}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute -top-3 bg-surface-deep/95 border border-primary px-3 py-1.5 pointer-events-none font-data-mono text-xs z-20 shadow-xl"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-primary font-bold text-center">
              {points[hoveredIndex].data.year}
            </div>
            <div className="text-on-surface text-[11px] whitespace-nowrap">
              {activeMetric === 'rate'
                ? `Clearance: ${points[hoveredIndex].data.rate}%`
                : activeMetric === 'resolved'
                ? `Resolved: ${points[hoveredIndex].data.resolved.toLocaleString()} cases`
                : `Total: ${points[hoveredIndex].data.total.toLocaleString()} cases`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
