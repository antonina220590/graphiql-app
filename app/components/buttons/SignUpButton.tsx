'use client';

import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SignUpButton() {
  const { t } = useTranslation();
  return (
    <Link href="/signUp">
      <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease">
        {t('header.signUp')}
      </button>
    </Link>
  );
}
