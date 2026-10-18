import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: (en: string, ur: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'tpa_portal_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (saved === 'en' || saved === 'ur') return saved;
    }
    return 'en';
  });

  const isRTL = language === 'ur';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    
    if (isRTL) {
      root.classList.add('font-arabic');
      root.classList.remove('font-poppins');
    } else {
      root.classList.add('font-poppins');
      root.classList.remove('font-arabic');
    }

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore localstorage issues in sandbox/private modes
    }
  }, [language, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const t = (en: string, ur: string) => (language === 'ur' ? ur : en);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
