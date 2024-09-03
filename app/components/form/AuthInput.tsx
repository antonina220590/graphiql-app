'use client';

import React, { ChangeEvent } from 'react';

interface AuthInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="border-2 p-2 rounded flex-grow focus:border-yellow-500 focus:outline-none"
    />
  );
};

export default AuthInput;
