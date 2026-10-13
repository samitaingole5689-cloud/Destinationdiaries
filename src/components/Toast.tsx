import React from 'react';
import { Check, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-stone-100 px-4 py-3 rounded-lg shadow-xl border border-stone-800 text-sm animate-fade-in">
      {type === 'success' ? (
        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-stone-400 hover:text-stone-200 text-xs px-1"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
};
