import { describe, it, expect } from 'vitest';

import generateEncodedUrl from './urlHelper';

describe('generateEncodedUrl', () => {
  it('should return the base URL when no URL is provided', () => {
    const result = generateEncodedUrl('GET', '', null, [], []);
    expect(result).toBe(window.location.origin);
  });

  it('should correctly encode and append URL', () => {
    const url = 'https://api.example.com/data';
    const result = generateEncodedUrl('GET', url, null, [], []);
    const expected = `${window.location.origin}/restfullClient/GET/${btoa(encodeURIComponent(url))}`;
    expect(result).toBe(expected);
  });

  it('should correctly encode and append parameters', () => {
    const url = 'https://api.example.com/data';
    const params = [
      { key: 'search', value: 'test' },
      { key: 'page', value: '1' },
    ];
    const paramStr = params
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
      )
      .join('&');
    const encodedParams = btoa(paramStr);
    const result = generateEncodedUrl('GET', url, null, [], params);
    const expected = `${window.location.origin}/restfullClient/GET/${btoa(encodeURIComponent(url))}/${encodedParams}`;
    expect(result).toBe(expected);
  });

  it('should correctly encode and append body', () => {
    const url = 'https://api.example.com/data';
    const body = JSON.stringify({ key: 'value' });
    const encodedBody = btoa(encodeURIComponent(body));
    const result = generateEncodedUrl('POST', url, body, [], []);
    const expected = `${window.location.origin}/restfullClient/POST/${btoa(encodeURIComponent(url))}#${encodedBody}`;
    expect(result).toBe(expected);
  });
  it('should handle empty parameters correctly', () => {
    const url = 'https://api.example.com/data';
    const params: { key: string; value: string }[] = [];
    const result = generateEncodedUrl('GET', url, null, [], params);
    const expected = `${window.location.origin}/restfullClient/GET/${btoa(encodeURIComponent(url))}`;
    expect(result).toBe(expected);
  });

  it('should handle empty body correctly', () => {
    const url = 'https://api.example.com/data';
    const body: string | null = null;
    const result = generateEncodedUrl('POST', url, body, [], []);
    const expected = `${window.location.origin}/restfullClient/POST/${btoa(encodeURIComponent(url))}`;
    expect(result).toBe(expected);
  });

  it('should handle empty headers correctly', () => {
    const url = 'https://api.example.com/data';
    const headers: { key: string; value: string }[] = [];
    const result = generateEncodedUrl('GET', url, null, headers, []);
    const expected = `${window.location.origin}/restfullClient/GET/${btoa(encodeURIComponent(url))}`;
    expect(result).toBe(expected);
  });
});
