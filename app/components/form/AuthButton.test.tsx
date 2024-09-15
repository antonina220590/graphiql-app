import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { AuthButton } from './AuthButton';

describe('AuthButton Component', () => {
  test('renders the button with the correct title', () => {
    const title = 'Log In';

    render(<AuthButton title={title} />);

    const buttonElement = screen.getByRole('button', { name: title });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(title);

    expect(buttonElement).toHaveClass('bg-orange-500');
    expect(buttonElement).toHaveClass('text-white');
    expect(buttonElement).toHaveClass('p-2');
    expect(buttonElement).toHaveClass('rounded');
    expect(buttonElement).toHaveClass('hover:bg-orange-600');
    expect(buttonElement).toHaveClass('transition');
    expect(buttonElement).toHaveClass('duration-300');
  });
});
