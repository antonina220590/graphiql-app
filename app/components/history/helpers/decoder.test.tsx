import { describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';

import extractAndSanitize from './urlSanitizer';
import decodeBase64 from './decoder';

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

vi.mock('./urlSanitizer', () => {
  return {
    default: vi.fn(),
  };
});

describe('decodeBase64', () => {
  it('should decode a valid base64 string and return the result', () => {
    const base64String = btoa('Hello World');

    (extractAndSanitize as vi.Mock).mockReturnValue(base64String);

    const result = decodeBase64(base64String);

    expect(result).toBe('Hello World');
    expect(extractAndSanitize).toHaveBeenCalledWith(base64String);
    expect(toast).not.toHaveBeenCalled();
  });

  it('should call toast and return an empty string when decoding fails', () => {
    const invalidBase64 = '!!!invalidbase64';

    (extractAndSanitize as vi.Mock).mockReturnValue(invalidBase64);

    const result = decodeBase64(invalidBase64);

    expect(result).toBe('');
    expect(toast).toHaveBeenCalledWith(
      'Failed to decode base64 string.',
      expect.any(Object)
    );
    expect(extractAndSanitize).toHaveBeenCalledWith(invalidBase64);
  });
});
