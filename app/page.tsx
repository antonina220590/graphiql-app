'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { useAuthStatus } from './hooks/useAuthStatus';
import SignInButton from './components/buttons/SignInButton';
import SignUpButton from './components/buttons/SignUpButton';
import PostmanIcon from './components/mainPage/postmanLogo';
import HandShakeIcon from './components/mainPage/handshake';
import GraphQLIcon from './components/mainPage/graphLogo';

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
    <main className="bg-light flex flex-col items-center  justify-center">
      <div className="w-3/4 flex flex-col justify-center h-[800px] items-center gap-[100px]">
        <h4
          className="text-7xl text-center leading-normal font-bold bg-gradient-to-r from-orange-400 via-red-600 to-blue-600 bg-clip-text text-transparent  animate-gradient-shift"
          style={{ backgroundSize: '200% 100%' }}
        >
          We are happy to greet you!
        </h4>
        <span className="text-3xl leading-normal font-bold bg-gradient-to-r from-blue-600 via-red-600 to-orange-400 bg-clip-text text-transparent">
          This is a light-weight versions of Postman and GrqphiQL combined in
          one app.
        </span>
        <div className="flex items-center gap-[100px]">
          <GraphQLIcon />
          <HandShakeIcon />
          <PostmanIcon />
        </div>
      </div>
      <div className="flex flex-col justify-center h-[800px] items-center">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isAuthenticated ? (
          <div className="text-center flex flex-col gap-[50px]">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-blue-600 bg-clip-text text-transparent">
              Welcome Back, {username}!
            </h1>
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
          <div className="text-center flex flex-col gap-[30px]">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-blue-600 bg-clip-text text-transparent">
              Welcome!
            </h1>
            <div className="flex gap-10 mt-4 justify-center">
              <SignInButton />
              <SignUpButton />
            </div>
          </div>
        )}
      </div>
      <div className="">
        <span>Our Team</span>
      </div>
    </main>
  );
}
