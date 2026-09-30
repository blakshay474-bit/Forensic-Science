import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  refNo?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  refNo,
  children,
  maxWidth = 'max-w-3xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#07090C]/85 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Modal Container */}
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] flex flex-col bg-surface-elevated border border-outline-variant shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-scaleUp`}
      >
        {/* Top Header */}
        <div className="bg-surface-dim border-b border-outline-variant p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {refNo && (
              <span className="font-label-caps text-xs text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 tracking-wider">
                {refNo}
              </span>
            )}
            <h3 className="font-display-lg text-lg sm:text-xl font-bold text-on-surface">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-muted hover:text-primary transition-colors p-1 flex items-center justify-center border border-outline-variant/40 hover:border-primary/40 bg-surface/50"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-hide text-on-surface-variant font-body-md">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="bg-surface-dim border-t border-outline-variant px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="font-data-mono text-[11px] text-slate-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-evidence-green"></span>
            DOSSIER VERIFIED // ISO-17025
          </div>
          <button
            onClick={onClose}
            className="bg-primary text-on-primary font-label-caps text-xs px-5 py-2 hover:bg-primary-container transition-colors btn-glow"
          >
            DISMISS DOSSIER
          </button>
        </div>

        {/* Tactical Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary pointer-events-none" />
      </div>
    </div>
  );
};
