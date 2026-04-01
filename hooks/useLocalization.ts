import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  const isPortuguese = (i18n.resolvedLanguage ?? i18n.language).toLowerCase().startsWith('pt');

  const toggleLanguage = useCallback(() => {
    i18n.changeLanguage(isPortuguese ? 'en' : 'pt');
  }, [isPortuguese, i18n]);

  return { t, i18n, isPortuguese, toggleLanguage };
};
