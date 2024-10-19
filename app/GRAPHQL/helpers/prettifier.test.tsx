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
  const t = (key: string) => key;

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
      }
    ).mockReturnValue(formattedQuery);

    const result = await formatQuery(mockQuery, t);

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
      }
    ).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const result = await formatQuery(mockQuery, t);

    expect(result).toEqual(mockQuery);
    expect(prettier.format).toHaveBeenCalledWith(mockQuery, expect.any(Object));

    expect(toast).toHaveBeenCalledWith(t('graphql.formattingFail'), {
      description: expect.any(String),
      action: expect.any(Object),
    });
  });
});
