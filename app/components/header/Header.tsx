'use client';

import Logo from './logo/logo';
import LanguageToggler from './langToggler/language';
export default function Header() {
  return (
    <header className="bg-dark w-full box-border mx-auto">
      <div className="h-[10vh] flex items-center box-border w-full p-0 px-5 justify-between">
        <Logo />
        <LanguageToggler />
      </div>
    </header>
  );
}
