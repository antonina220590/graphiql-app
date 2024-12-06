'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { auth } from '../../firebaseConfig';
import AuthForm from '../components/form/AuthForm';
import { useAuthStatus } from '../hooks/useAuthStatus';

export default function SignIn() {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const {
    isAuthenticated,
    checkingStatus,
    setHasJustLoggedIn,
    hasJustLoggedIn,
  } = useAuthStatus();

  useEffect(() => {
    if (!checkingStatus && isAuthenticated && !hasJustLoggedIn) {
      toast(t('signIn.alreadyLoggedIn'));
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }, [isAuthenticated, checkingStatus, hasJustLoggedIn, router, t]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      ?.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setHasJustLoggedIn(true);
      toast.success(t('signIn.success'));
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      setErrorMessage(t('signIn.signInError'));
    }
  };

  if (checkingStatus || isAuthenticated) return null;

  return (
    <div>
      <AuthForm title="Sign In" onSubmit={handleSignIn} />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}
