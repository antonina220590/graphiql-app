'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { auth } from '../../firebaseConfig';

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tokenResult = await getIdTokenResult(user);
          const isExpired =
            tokenResult.expirationTime < new Date().toISOString();

          if (isExpired) {
            auth.signOut();
            router.push('/');
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          setErrorMessage(
            'Error checking token status. Please try again later.'
          );
        }
      } else {
        setIsAuthenticated(false);
      }
      setCheckingStatus(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { isAuthenticated, checkingStatus, errorMessage };
}
