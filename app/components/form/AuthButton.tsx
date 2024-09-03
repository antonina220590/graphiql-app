'use client';

import React from 'react';

interface AuthButtonProps {
  text: string;
  onClick?: () => void;
}

export default function AuthButton({ text, onClick }: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
