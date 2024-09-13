'use client';

import ErrorBoundary from './utils/errorBoundary';

const ErrorWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ErrorWrapper;
