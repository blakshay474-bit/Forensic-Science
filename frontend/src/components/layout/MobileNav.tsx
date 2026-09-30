import React from 'react';
import { NavLink } from 'react-router-dom';

const MOBILE_ITEMS = [
  { to: '/', label: 'DASHBOARD', icon: 'dashboard' },
  { to: '/services', label: 'SERVICES', icon: 'science' },
  { to: '/cases', label: 'CASES', icon: 'folder_open' },
  { to: '/analytics', label: 'ANALYTICS', icon: 'analytics' },
  { to: '/contact', label: 'DISPATCH', icon: 'emergency' },
];

export const MobileNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-deep/95 backdrop-blur-xl border-t border-outline-variant flex justify-around items-center h-16 px-1 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
      {MOBILE_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 py-1 px-2 transition-all ${
              isActive
                ? 'text-primary scale-105 font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`material-symbols-outlined text-xl ${
                  isActive ? 'fill text-primary' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="font-label-caps text-[9px] tracking-wider">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-0.5 bg-primary rounded-full shadow-[0_0_6px_#f4c367]" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
