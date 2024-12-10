import React from 'react';
import { render } from '@testing-library/react';

import { store } from '../app/slices/store';
import ProviderWrapper from './providerWrapper';

describe('ProviderWrapper', () => {
  it('should render children within the Redux Provider', () => {
    const { getByText } = render(
      <ProviderWrapper>
        <h1>Test Child</h1>
      </ProviderWrapper>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('should provide the redux store to nested components', () => {
    const TestComponent = () => {
      const state = store.getState();
      return <div>{JSON.stringify(state)}</div>;
    };

    const { getByText } = render(
      <ProviderWrapper>
        <TestComponent />
      </ProviderWrapper>
    );
    expect(getByText(/"/)).toBeInTheDocument();
  });
});
