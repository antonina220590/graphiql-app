// generateEncodedUrl.test.ts
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
    const result = generateEncodedUrl('GET', url, null, [], params);
    const paramStr = params
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
      )
      .join('&');
    const expected = `${window.location.origin}/restfullClient/GET/${btoa(encodeURIComponent(url))}/${btoa(paramStr)}`;
    expect(result).toBe(expected);
  });

  it('should correctly encode and append headers', () => {
    const url = 'https://api.example.com/data';
    const headers = [
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ];
    const result = generateEncodedUrl('POST', url, null, headers, []);
    const headerStr = headers
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`
      )
      .join('&');
    const expected = `${window.location.origin}/restfullClient/POST/${btoa(encodeURIComponent(url))}/${btoa(headerStr)}`;
    expect(result).toBe(expected);
  });

  it('should correctly encode and append body', () => {
    const url = 'https://api.example.com/data';
    const body = JSON.stringify({ key: 'value' });
    const result = generateEncodedUrl('POST', url, body, [], []);
    const expected = `${window.location.origin}/restfullClient/POST/${btoa(encodeURIComponent(url))}/${btoa(encodeURIComponent(body))}`;
    expect(result).toBe(expected);
  });

  it('should correctly encode and append parameters, headers, and body', () => {
    const url = 'https://api.example.com/data';
    const params = [
      { key: 'search', value: 'test' },
      { key: 'page', value: '1' },
    ];
    const headers = [
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ];
    const body = JSON.stringify({ key: 'value' });
    const result = generateEncodedUrl('POST', url, body, headers, params);
    const paramStr = params
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
      )
      .join('&');
    const headerStr = headers
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`
      )
      .join('&');
    const expected = `${window.location.origin}/restfullClient/POST/${btoa(encodeURIComponent(url))}/${btoa(paramStr)}/${btoa(headerStr)}/${btoa(encodeURIComponent(body))}`;
    expect(result).toBe(expected);
  });
});
