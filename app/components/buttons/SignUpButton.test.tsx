import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import SignUpButton from './SignUpButton';

const mockI18n = i18n.createInstance();
mockI18n.init({
  lng: 'en',
  resources: {
    en: {
      header: {
        signUp: 'Sign Up',
      },
    },
  },
});

describe('SignUpButton', () => {
  it('renders the button with the correct link', () => {
    render(
      <I18nextProvider i18n={mockI18n}>
        <SignUpButton />
      </I18nextProvider>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/signUp');
  });
});
