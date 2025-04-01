
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeConfig, enTranslations, arTranslations, LanguageTranslations } from '../config/storeConfig';

type LanguageContextType = {
  language: 'en' | 'ar';
  translations: LanguageTranslations;
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'en' | 'ar'>(storeConfig.defaultLanguage);
  const [translations, setTranslations] = useState<LanguageTranslations>(
    language === 'en' ? enTranslations : arTranslations
  );

  const setLanguage = (lang: 'en' | 'ar') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Set HTML dir attribute for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update translations
    setTranslations(lang === 'en' ? enTranslations : arTranslations);
  };

  // Translate function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  useEffect(() => {
    // Load language preference from localStorage on initial load
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null;
    if (savedLanguage && storeConfig.supportedLanguages.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage(storeConfig.defaultLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
