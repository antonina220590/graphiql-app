'use client';

import Logo from './logo/logo';
import LanguageToggler from './langToggler/language';
export default function Header() {
  return (
    <header className="bg-dark w-full box-border mx-auto">
      <div className="flex items-center box-border w-full p-0 py-4 px-5 justify-between">
        <Logo />
        <LanguageToggler />
      </div>
    </header>
  );
}
