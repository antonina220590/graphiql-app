'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function LanguageToggler() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    setCurrentLang(selectedLanguage);
  };

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  return (
    <div className="flex space-x-4">
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className="text-lg p-2 rounded bg-gray-100"
      >
        <option value="ru">{t('language.ru')}</option>
        <option value="en">{t('language.en')}</option>
        <option value="be">{t('language.be')}</option>
      </select>
    </div>
  );
}
