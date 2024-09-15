'use client';

import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SignInButton() {
  const { t } = useTranslation();
  return (
    <Link href="/signIn">
      <button
        data-testid="sign-in-button"
        className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300 ease"
      >
        {t('header.signIn')}
      </button>
    </Link>
  );
}
