
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="outline"
      size={isMobile ? "default" : "sm"}
      onClick={toggleLanguage}
      className={`font-medium ${isMobile ? 'w-full h-12 text-base' : ''}`}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
