import { describe, expect, it } from 'vitest';

import extractAndSanitize from './urlSanitizer';

describe('extractAndSanitize', () => {
  it('should sanitize base64 string with URL-safe characters', () => {
    const input = 'SGVsbG8gV29ybGQh';
    const expected = 'SGVsbG8gV29ybGQh';

    const result = extractAndSanitize(input);

    expect(result).toBe(expected);
  });

  it('should add padding to incomplete base64 string', () => {
    const input = 'SGVsbG8';
    const expected = 'SGVsbG8=';

    const result = extractAndSanitize(input);

    expect(result).toBe(expected);
  });

  it('should handle base64 strings with trailing equals sign', () => {
    const input = 'SGVsbG8=';
    const expected = 'SGVsbG8=';

    const result = extractAndSanitize(input);

    expect(result).toBe(expected);
  });

  it('should handle empty string input gracefully', () => {
    const input = '';
    const expected = '';

    const result = extractAndSanitize(input);

    expect(result).toBe(expected);
  });
});
