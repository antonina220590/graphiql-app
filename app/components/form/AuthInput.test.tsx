import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { AuthInput } from './AuthInput';

describe('AuthInput Component', () => {
  test('renders the input with correct props', () => {
    const onChangeMock = vi.fn();
    const props = {
      type: 'text',
      name: 'username',
      placeholder: 'Enter username',
      value: '',
      onChange: onChangeMock,
      required: true,
    };

    render(<AuthInput {...props} />);

    const inputElement = screen.getByPlaceholderText('Enter username');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'username');
    expect(inputElement).toBeRequired();
  });
});
