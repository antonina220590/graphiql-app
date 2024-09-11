import { describe, it, expect } from 'vitest';

import generateEncodedUrl from './urlHelper';

describe('generateEncodedUrl', () => {
  it('generates the correct encoded URL', () => {
    const url = 'http://example.com/api';
    const commonBody = '{"key": "value"}';
    const headers = [
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ];

    const result = generateEncodedUrl(url, commonBody, headers);

    const endpointUrlEncoded = btoa(encodeURIComponent(url.trim()));
    const bodyEncoded = btoa(encodeURIComponent(commonBody.trim()));

    const headerParams = headers
      .filter((header) => header.key && header.value)
      .map((header) => `${header.key.trim()}=${header.value.trim()}`)
      .join('&');

    const expectedUrl = `${window.location.origin}/graphiQL/${endpointUrlEncoded}/${bodyEncoded}${headerParams ? `?${headerParams}` : ''}`;

    expect(result).toEqual(expectedUrl);
  });

  it('returns an empty string when the URL or body is empty', () => {
    expect(generateEncodedUrl('', '{"key": "value"}', [])).toEqual('');
    expect(generateEncodedUrl('http://example.com/api', '', [])).toEqual('');
  });

  it('includes the headers', () => {
    const url = 'http://example.com/api';
    const commonBody = '{"key": "value"}';
    const headers = [{ key: 'Custom-Key', value: 'value with spaces' }];

    const result = generateEncodedUrl(url, commonBody, headers);

    const endpointUrlEncoded = btoa(encodeURIComponent(url.trim()));
    const bodyEncoded = btoa(encodeURIComponent(commonBody.trim()));
    const headerParams = `${headers[0].key.trim()}=${headers[0].value.trim()}`;

    const expectedUrl = `${window.location.origin}/graphiQL/${endpointUrlEncoded}/${bodyEncoded}?${headerParams}`;

    expect(result).toEqual(expectedUrl);
  });

  it('headers filtering', () => {
    const url = 'http://example.com/api';
    const commonBody = '{"key": "value"}';
    const headers = [
      { key: 'Valid-Header', value: 'header value' },
      { key: '', value: 'invalid header' },
      { key: 'another-header', value: '' },
    ];

    const result = generateEncodedUrl(url, commonBody, headers);

    const endpointUrlEncoded = btoa(encodeURIComponent(url.trim()));
    const bodyEncoded = btoa(encodeURIComponent(commonBody.trim()));
    const expectedHeaderParams = 'Valid-Header=header value';

    const expectedUrl = `${window.location.origin}/graphiQL/${endpointUrlEncoded}/${bodyEncoded}?${expectedHeaderParams}`;

    expect(result).toEqual(expectedUrl);
  });
});
