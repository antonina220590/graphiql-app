'use client';

import Link from 'next/link';
import React from 'react';

export default function SignInButton() {
  return (
    <Link href="/signIn">
      <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300 ease">
        Sign In
      </button>
    </Link>
  );
}
