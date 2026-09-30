import React from 'react';

interface RadarAxis {
  label: string;
  value: number; // 0 to 100
}

interface RadarChartProps {
  axes?: RadarAxis[];
  color?: string;
  size?: number;
}

const DEFAULT_AXES: RadarAxis[] = [
  { label: 'PLANNING DEPTH', value: 88 },
  { label: 'TECH COMPLEXITY', value: 92 },
  { label: 'EVIDENCE TRAIL', value: 34 },
  { label: 'RECURRENCE RATE', value: 78 },
  { label: 'CROSS-JURISDICTION', value: 85 },
  { label: 'INSIDER ACCESS', value: 45 },
];

export const RadarChart: React.FC<RadarChartProps> = ({
  axes = DEFAULT_AXES,
  color = '#f4c367',
  size = 280,
}) => {
  const center = size / 2;
  const radius = size * 0.38;
  const total = axes.length;

  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (val / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getAxisPoint = (index: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const labelX = center + (radius + 24) * Math.cos(angle);
    const labelY = center + (radius + 20) * Math.sin(angle);
    return { x, y, labelX, labelY };
  };

  // Polygon points
  const polyPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Concentric Polygons / Grid Web */}
        {[0.25, 0.5, 0.75, 1.0].map((level, lvlIdx) => {
          const gridPoints = axes
            .map((_, i) => {
              const { x, y } = getCoordinates(i, level * 100);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={lvlIdx}
              points={gridPoints}
              fill="none"
              stroke="#262a30"
              strokeWidth="1"
              strokeDasharray={lvlIdx < 3 ? '2 2' : 'none'}
            />
          );
        })}

        {/* Axis Spoke Lines */}
        {axes.map((axis, i) => {
          const { x, y, labelX, labelY } = getAxisPoint(i);
          return (
            <g key={i}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#31353b"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-muted font-label-caps text-[9px]"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {/* Filled Polygon */}
        <polygon
          points={polyPoints}
          fill={color}
          fillOpacity="0.25"
          stroke={color}
          strokeWidth="2"
        />

        {/* Vertex Dots */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(i, axis.value);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill={color}
              stroke="#07090C"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    </div>
  );
};
