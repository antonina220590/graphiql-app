'use client';

import Link from 'next/link';
import React from 'react';

export default function SignUpButton() {
  return (
    <Link href="/signUp">
      <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease">
        Sign Up
      </button>
    </Link>
  );
}
