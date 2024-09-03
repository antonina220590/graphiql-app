'use client';

import React, { ReactNode, FormEvent } from 'react';

interface AuthFormProps {
  title: string;
  onSubmit: (e: FormEvent) => void;
  children?: ReactNode;
}

export default function AuthForm({ title, onSubmit, children }: AuthFormProps) {
  return (
    <main className="flex-grow p-4 bg-light flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </main>
  );
}
