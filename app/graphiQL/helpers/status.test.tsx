import { describe, it, expect } from 'vitest';

import statusTexts from './status';

describe('statusTexts', () => {
  it('should contain expected codes with their messages', () => {
    const expectedStatusCodes = [
      100, 101, 200, 201, 204, 400, 401, 403, 404, 500, 503,
    ];

    expectedStatusCodes.forEach((code) =>
      expect(statusTexts).toHaveProperty(code.toString())
    );
  });

  it('should return correct messages for specific status codes', () => {
    expect(statusTexts[200]).toEqual('OK');
    expect(statusTexts[404]).toEqual('Not Found');
    expect(statusTexts[500]).toEqual('Internal Server Error');
    expect(statusTexts[401]).toEqual('Unauthorized');
    expect(statusTexts[503]).toEqual('Service Unavailable');
  });

  it('should not contain unexpected status codes', () => {
    expect(statusTexts).not.toHaveProperty('999');
    expect(statusTexts).not.toHaveProperty('418');
  });
});
