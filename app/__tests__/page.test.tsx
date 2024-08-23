import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Page from '../page';

test('renders the Page component', () => {
  render(<Page />);
  expect(
    screen.getByRole('heading', { level: 1, name: /welcome!/i })
  ).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});
