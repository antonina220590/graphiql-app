'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { auth } from '../../firebaseConfig';
import AuthForm from '../components/form/AuthForm';
import { useAuthStatus } from '../hooks/useAuthStatus';

export default function SignUp() {
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
      toast(t('signUp.alreadyLoggedUp'));
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }, [isAuthenticated, checkingStatus, hasJustLoggedIn, router, t]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      ?.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setHasJustLoggedIn(true);
      toast.success(t('signUp.success'));
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (error) {
      setErrorMessage(t('signUp.signUpError'));
    }
  };

  if (checkingStatus || isAuthenticated) return null;

  return (
    <div>
      <AuthForm title="Sign Up" onSubmit={handleSignUp} isSignUp />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}
