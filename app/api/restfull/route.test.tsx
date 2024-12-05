import { describe, it, expect, vi, Mock } from 'vitest';
import { NextRequest } from 'next/server';

import { POST } from './route';

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn(
      (
        data: unknown,
        init: { status: number; headers?: Record<string, string> }
      ) => ({
        data,
        init,
      })
    ),
  },
}));

interface MockRequestBody {
  url: string | null;
  method: string;
  headers: Record<string, string>;
  body: unknown | null;
}

const createMockRequest = (body: MockRequestBody): NextRequest => {
  return {
    json: async () => body,
  } as unknown as NextRequest;
};

global.fetch = vi.fn();

describe('POST handler', () => {
  it('should return 400 if URL is invalid', async () => {
    const mockRequest = createMockRequest({
      url: null,
      method: 'GET',
      headers: {},
      body: null,
    });

    const result = await POST(mockRequest);

    expect(result).toEqual({
      data: { error: 'Invalid URL provided' },
      init: { status: 400 },
    });
  });

  it('should return data from external API on success', async () => {
    const mockResponse = { message: 'Success' };

    (global.fetch as Mock).mockResolvedValueOnce({
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const mockRequest = createMockRequest({
      url: 'https://swapi.dev/api/people',
      method: 'GET',
      headers: {},
      body: null,
    });

    const result = await POST(mockRequest);

    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people', {
      method: 'GET',
      headers: new Headers({}),
      body: undefined,
    });

    expect(result).toEqual({
      data: mockResponse,
      init: {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
    });
  });

  it('should handle fetch errors', async () => {
    (global.fetch as Mock).mockRejectedValueOnce(new Error('Network error'));

    const mockRequest = createMockRequest({
      url: 'https://swapi.dev/api/people',
      method: 'GET',
      headers: {},
      body: null,
    });

    const result = await POST(mockRequest);

    expect(result).toEqual({
      data: {
        error: 'Failed to fetch data',
        details: 'Network error',
      },
      init: { status: 500 },
    });
  });
});
