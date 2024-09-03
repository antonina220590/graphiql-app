'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebaseConfig';
import AuthForm from '../components/form/AuthForm';
import AuthInput from '../components/form/AuthInput';
import AuthButton from '../components/form/AuthButton';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      setError('Failed to sign up. Please check your credentials.');
    }
  };

  return (
    <AuthForm title="Sign Up" onSubmit={handleSignUp}>
      <AuthInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <AuthInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <AuthButton text="Sign Up" />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </AuthForm>
  );
}
