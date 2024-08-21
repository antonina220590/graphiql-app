import { useState } from 'react';

export default function LanguageToggler() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="flex space-x-4">
      <button
        className={`[font-size:25px] text-lg focus:outline-none ${language === 'en' ? 'underline' : ''}`}
        style={{ color: '#cdcdcd' }}
        onClick={() => setLanguage('en')}
      >
        ENG
      </button>
      <button
        className={`[font-size:25px] text-lg focus:outline-none ${language === 'ru' ? 'underline' : ''}`}
        style={{ color: '#cdcdcd' }}
        onClick={() => setLanguage('ru')}
      >
        РУ
      </button>
    </div>
  );
}
