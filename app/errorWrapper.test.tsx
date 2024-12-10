import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ErrorWrapper from './errorWrapper';

vi.mock('./ErrorBoundary', () => {
  const MockErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <div>
      <h1>Error Boundary Mock</h1>
      {children}
    </div>
  );
  MockErrorBoundary.displayName = 'MockErrorBoundary';
  return {
    __esModule: true,
    default: MockErrorBoundary,
  };
});

describe('ErrorWrapper Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorWrapper>
        <div>Child Component</div>
      </ErrorWrapper>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('catches and displays error', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorWrapper>
        <ErrorComponent />
      </ErrorWrapper>
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });
});
