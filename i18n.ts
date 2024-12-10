import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import en from './public/locales/en/lang.json';
import ru from './public/locales/ru/lang.json';
import be from './public/locales/be/lang.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    be: {
      translation: be,
    },
  },
  supportedLngs: ['en', 'ru', 'be'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
