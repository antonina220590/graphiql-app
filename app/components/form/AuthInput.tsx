'use client';

import React, { ChangeEvent } from 'react';

interface AuthInputProps {
  type: string;
  name?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function AuthInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}: AuthInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="border-2 p-2 rounded flex-grow focus:border-yellow-500 focus:outline-none"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
