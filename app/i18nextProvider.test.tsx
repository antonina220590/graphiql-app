import React from 'react';
import { render } from '@testing-library/react';
import { expect, describe, test } from 'vitest';

import I18nProviderWrapper from './i18nextProvider';

describe('I18nProviderWrapper Component', () => {
  test('renders children correctly', () => {
    const { getByText } = render(
      <I18nProviderWrapper>
        <div>Hello, World!</div>
      </I18nProviderWrapper>
    );
    expect(getByText('Hello, World!')).toBeInTheDocument();
  });
});
