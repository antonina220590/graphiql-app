import { describe, it, expect, vi } from 'vitest';
import { toast } from 'sonner';
import * as prettier from 'prettier/standalone';

import formatQuery from './prettifier';

vi.mock('prettier/standalone', () => ({
  format: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

describe('formatQuery', () => {
  it('query is formatted', async () => {
    const mockQuery = 'query { user { id } }';
    const formattedQuery = `query {
  user {
    id
  }
}`;

    (
      prettier.format as unknown as {
        mockReturnValue(formattedQuery: string): unknown;
        mock: { returnValue: (value: string) => void };
      }
    ).mockReturnValue(formattedQuery);

    const result = await formatQuery(mockQuery);

    expect(result).toEqual(formattedQuery);
    expect(prettier.format).toHaveBeenCalledWith(mockQuery, expect.any(Object));
    expect(toast).not.toHaveBeenCalled();
  });

  it('handles formatting errors', async () => {
    const mockQuery = 'query { user { id } }';
    const errorMessage = 'Some formatting error';

    (
      prettier.format as unknown as {
        mockImplementation(arg0: () => never): unknown;
        mock: { implementation: () => void };
      }
    ).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const result = await formatQuery(mockQuery);

    expect(result).toEqual(mockQuery);
    expect(prettier.format).toHaveBeenCalledWith(mockQuery, expect.any(Object));

    expect(toast).toHaveBeenCalledWith('Formatting failed, please try again!', {
      description: expect.any(String),
      action: expect.any(Object),
    });
  });
});
