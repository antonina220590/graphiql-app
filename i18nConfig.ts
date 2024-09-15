/**
 * @type {import('next').NextConfig}
 */
const i18nConfig = {
  locales: ['en', 'ru', 'be'],
  defaultLocale: 'en',
  localeDetection: false,
  react: { useSuspense: false },
};

module.exports = i18nConfig;
