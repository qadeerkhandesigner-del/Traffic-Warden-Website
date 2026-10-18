import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface LanguageToggleProps {
  variant?: 'button' | 'badge';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'button',
  className = '',
}) => {
  const { language, toggleLanguage } = useLanguage();

  if (variant === 'badge') {
    return (
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border border-slate-300 hover:border-brand-blue hover:text-brand-blue bg-white text-slate-700 transition-colors ${className}`}
        aria-label="Toggle language between English and Urdu"
      >
        <Languages className="w-3.5 h-3.5 text-brand-blue" />
        <span>{language === 'en' ? 'اردو' : 'English'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 bg-white/90 hover:bg-white text-slate-800 border-slate-200 hover:border-brand-blue shadow-sm ${className}`}
      aria-label="Switch portal language"
    >
      <Languages className="w-4 h-4 text-brand-blue shrink-0" />
      <span className="flex items-center gap-1.5">
        <span className={language === 'en' ? 'text-brand-blue font-bold' : 'text-slate-400'}>
          EN
        </span>
        <span className="text-slate-300">/</span>
        <span className={language === 'ur' ? 'text-brand-blue font-bold font-arabic' : 'text-slate-400 font-arabic'}>
          اردو
        </span>
      </span>
    </button>
  );
};
