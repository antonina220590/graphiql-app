'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { auth } from '../../../../firebaseConfig';
import { useAuthStatus } from '../../../hooks/useAuthStatus';

export default function SignOutButton() {
  const { isAuthenticated } = useAuthStatus();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      setErrorMessage('Error signing out. Please try again.');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease"
      >
        Sign Out
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
}
