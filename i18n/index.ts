import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import pt from './locales/pt_br.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            pt: { translation: pt },
        },
        lng: Localization.getLocales()[0].languageCode ?? 'en',
        supportedLngs: ['en', 'pt'],
        nonExplicitSupportedLngs: true,
        load: 'languageOnly',
        cleanCode: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;