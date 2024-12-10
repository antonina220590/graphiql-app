'use client';

import '../i18n';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

import { auth } from '../firebaseConfig';
import { useAuthStatus } from './hooks/useAuthStatus';
import SignInButton from './components/buttons/SignInButton';
import SignUpButton from './components/buttons/SignUpButton';
import PostmanIcon from './components/mainPage/postmanLogo';
import HandShakeIcon from './components/mainPage/handshake';
import GraphQLIcon from './components/mainPage/graphLogo';
import RoundImage from './components/mainPage/roundImage';

export default function Page() {
  const { t } = useTranslation();
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
          {t('home.welcomeMessage')}
        </h4>
        <span className="text-3xl leading-normal font-bold bg-gradient-to-r from-blue-600 via-red-600 to-orange-400 bg-clip-text text-transparent">
          {t('home.description')}
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
              {t('home.description')} {username}!
            </h1>
            <div className="flex gap-4 mt-4 justify-center">
              <Link href="/restfullClient">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease">
                  {t('home.rest')}
                </button>
              </Link>
              <Link href="/GRAPHQL">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease">
                  {t('home.qraphiQL')}
                </button>
              </Link>
              <Link href="/history">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease">
                  {t('home.history')}
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col gap-[30px]">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-blue-600 bg-clip-text text-transparent">
              {t('home.welcome')}
            </h1>
            <div className="flex gap-10 mt-4 justify-center">
              <SignInButton />
              <SignUpButton />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center h-[600px] items-center">
        <span className="text-5xl leading-normal font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
          {t('home.team')}
        </span>
        <div className="flex flex-row gap-[50px] mt-24 w-[80vw]">
          <div className="flex flex-col w-1/3 items-center justify-center gap-[20px]">
            <RoundImage
              src="/katya.png"
              alt="Description of image"
              width={150}
              height={150}
            />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{t('home.Kate')}</span>
              <span>{t('home.member')}</span>
              <span>{t('home.taskK')}</span>
            </div>
          </div>
          <div className="flex flex-col w-1/3 items-center justify-center gap-[20px]">
            <RoundImage
              src="/tonya.png"
              alt="Description of image"
              width={150}
              height={150}
            />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{t('home.Antonina')}</span>
              <span>{t('home.lead')}</span>
              <span>{t('home.taskA')}</span>
            </div>
          </div>
          <div className="flex flex-col w-1/3 items-center gap-[20px]">
            <RoundImage
              src="/ina.png"
              alt="Description of image"
              width={150}
              height={150}
            />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{t('home.Inna')}</span>
              <span>{t('home.member')}</span>
              <span>{t('home.taskI')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-[600px] items-center gap-[20px]">
        <span className="text-5xl leading-normal font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
          {t('home.rsSchool')}
        </span>
        <span className="w-1/2 text-center">
          {t('home.startDescription')}
          {t('home.rsSchool')}.{' '}
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {t('home.rsSchool')}{' '}
          </a>
          {t('home.rsSchoolDescription')}
        </span>
      </div>
    </main>
  );
}
