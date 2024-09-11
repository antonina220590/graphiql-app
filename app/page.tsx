'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthStatus } from './hooks/useAuthStatus';

export default function Page() {
  const { isAuthenticated, checkingStatus } = useAuthStatus();
  const router = useRouter();
  if (checkingStatus) {
    return null;
  }

  return (
    <main className="bg-light flex flex-col items-center justify-center">
      <h1>Welcome!</h1>
      <div className="flex gap-4 mt-4 justify-center">
        {isAuthenticated ? (
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease"
          >
            Main Page
          </button>
        ) : (
          <>
            <Link href="/signIn">
              <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300 ease">
                Sign in
              </button>
            </Link>
            <Link href="/signUp">
              <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
