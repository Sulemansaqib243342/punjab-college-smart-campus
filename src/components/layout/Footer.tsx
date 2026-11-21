import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <img
            src="/punjab-colleges-logo.png"
            alt="Punjab Colleges Logo"
            className="h-6 w-auto object-contain"
          />
          <span className="font-bold text-[#232766] dark:text-blue-300">
            Smart Campus
          </span>
          <span>•</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Punjab Colleges, Minar-e-Pakistan Campus Lahore</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Affiliated with BISE Lahore</span>
          <span>•</span>
          <span>Helpline: +92 42 111-742-111</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

