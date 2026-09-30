import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        setHoveringInteractive(isInteractive);
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Tactical Crosshair Ring */}
      <div
        className={`relative flex items-center justify-center rounded-full border transition-all duration-200 ${
          clicked
            ? 'w-4 h-4 border-primary bg-primary/20 scale-90'
            : hoveringInteractive
            ? 'w-8 h-8 border-tertiary bg-tertiary/10 scale-125'
            : 'w-6 h-6 border-primary/70'
        }`}
        style={{ mixBlendMode: 'difference' }}
      >
        {/* Horizontal Hair */}
        <div
          className={`absolute h-[1px] bg-primary transition-all ${
            hoveringInteractive ? 'w-10 bg-tertiary' : 'w-8 bg-primary/80'
          }`}
        />
        {/* Vertical Hair */}
        <div
          className={`absolute w-[1px] bg-primary transition-all ${
            hoveringInteractive ? 'h-10 bg-tertiary' : 'h-8 bg-primary/80'
          }`}
        />
        {/* Center Target Dot */}
        <div
          className={`w-1 h-1 rounded-full ${
            hoveringInteractive ? 'bg-tertiary shadow-[0_0_8px_#00dff6]' : 'bg-primary shadow-[0_0_6px_#f4c367]'
          }`}
        />
      </div>

      {/* Coordinate HUD tag when hovering interactive items */}
      {hoveringInteractive && (
        <div className="absolute top-5 left-5 bg-surface-deep/90 border border-tertiary/40 px-1.5 py-0.5 font-label-caps text-[9px] text-tertiary tracking-wider whitespace-nowrap shadow-lg">
          TARGET_LOCK [{Math.round(position.x)},{Math.round(position.y)}]
        </div>
      )}
    </div>
  );
};
