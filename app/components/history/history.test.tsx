import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import RequestHistory from './history';
import extractGraphQLOperation from './helpers/extractOperator';

interface RequestDetails {
  url: string;
  timestamp: string;
}

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RequestHistory Component', () => {
  const setupLocalStorage = (requests: RequestDetails[]) => {
    const localStorageMock: { [key: string]: string } = {
      savedRequests: JSON.stringify(requests),
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => localStorageMock[key] || null,
        setItem: (key: string, value: string) => {
          localStorageMock[key] = value.toString();
        },
        clear: () => {
          Object.keys(localStorageMock).forEach(
            (k) => delete localStorageMock[k]
          );
        },
      },
      writable: true,
    });
  };

  beforeEach(() => {
    setupLocalStorage([
      {
        url: 'http://localhost/restfullClient/GET',
        timestamp: '2023-01-23T11:19:20Z',
      },
      {
        url: 'http://localhost/restfullClient/POST',
        timestamp: '2023-01-22T10:00:00Z',
      },
    ]);

    mockPush.mockClear();
  });

  it('navigates to request details on clicking a request', async () => {
    render(<RequestHistory />);

    const requestLink = await screen.findByTitle(
      'http://localhost/restfullClient/GET'
    );

    fireEvent.click(requestLink);

    expect(mockPush).toHaveBeenCalledWith(
      'http://localhost/restfullClient/GET'
    );
  });

  it('renders the list of history requests', async () => {
    render(<RequestHistory />);
    const getLink = screen.getByText('GET', { selector: 'span' });
    expect(getLink).toBeInTheDocument();

    const requestGET = screen.getByTitle('http://localhost/restfullClient/GET');
    const requestPOST = screen.getByTitle(
      'http://localhost/restfullClient/POST'
    );

    expect(requestGET).toBeInTheDocument();
    expect(requestPOST).toBeInTheDocument();
  });

  it('renders message if no requests are found', () => {
    window.localStorage.setItem('savedRequests', '[]');
    render(<RequestHistory />);

    expect(
      screen.getByText('You haven`t executed any requests yet')
    ).toBeInTheDocument();
    expect(
      screen.getByText('It`s empty here. Try those options:')
    ).toBeInTheDocument();
  });

  it('renders correct message when there are no saved requests', () => {
    window.localStorage.setItem('savedRequests', JSON.stringify([]));
    render(<RequestHistory />);

    expect(
      screen.getByText('You haven`t executed any requests yet')
    ).toBeInTheDocument();
    expect(
      screen.getByText('It`s empty here. Try those options:')
    ).toBeInTheDocument();
  });

  it('renders buttons for Rest Client and GraphiQL Client when localStorage is empty', async () => {
    window.localStorage.setItem('savedRequests', '[]');
    render(<RequestHistory />);

    const restClientButton = screen.getByRole('button', {
      name: /Rest Client/i,
    });
    expect(restClientButton).toBeInTheDocument();

    const graphqlClientButton = screen.getByRole('button', {
      name: /GraphiQL Client/i,
    });
    expect(graphqlClientButton).toBeInTheDocument();
  });
  it('should extract the correct operation from a valid GraphQL query', () => {
    const query = '{"query": "{ getUser(id: 1) { id name } }"}';
    const operation = extractGraphQLOperation(query);
    expect(operation).toEqual('getUser');
  });
});
