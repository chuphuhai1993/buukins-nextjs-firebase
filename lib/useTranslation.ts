import { useState, useEffect, useCallback } from 'react';
import { Language, getTranslation } from './translations';

export type { Language };

export const useTranslation = (defaultLanguage: Language = 'vi') => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = useCallback((key: string): string => {
    return getTranslation(language, key);
  }, [language]);

  return {
    language,
    setLanguage,
    t
  };
}; 