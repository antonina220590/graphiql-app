'use client';

import React from 'react';

interface AuthButtonProps {
  title: string;
}

export function AuthButton({ title }: AuthButtonProps) {
  return (
    <button
      data-testid="signInButton"
      type="submit"
      className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300"
    >
      {title}
    </button>
  );
}
