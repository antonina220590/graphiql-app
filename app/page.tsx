'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { useAuthStatus } from './hooks/useAuthStatus';

export default function Page() {
  const { isAuthenticated, checkingStatus, errorMessage } = useAuthStatus();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  if (checkingStatus) {
    return null;
  }

  return (
    <main className="bg-light flex flex-col items-center justify-center">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {isAuthenticated ? (
        <div className="text-center">
          <h1>Welcome Back, {username}!</h1>
          <div className="flex gap-4 mt-4 justify-center">
            <Link href="/restfullClient">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease">
                REST Client
              </button>
            </Link>
            <Link href="/GRAPHQL">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease">
                GraphiQL Client
              </button>
            </Link>
            <Link href="/history">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease">
                History
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1>Welcome!</h1>
          <div className="flex gap-4 mt-4 justify-center">
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
          </div>
        </div>
      )}
    </main>
  );
}
