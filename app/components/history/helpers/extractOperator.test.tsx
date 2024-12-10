import { describe, it, expect } from 'vitest';

import extractGraphQLOperation from './extractOperator';

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

describe('extractGraphQLOperation', () => {
  it('should extract the operation name from a valid GraphQL query', () => {
    const query = JSON.stringify({
      query: 'query GetUsers { users { id name } }',
    });
    const result = extractGraphQLOperation(query);
    expect(result).toBe('users');
  });

  it('should return "query" if no matches are found after parsing', () => {
    const fakeQuery = JSON.stringify({ query: 'some random string' });
    const result = extractGraphQLOperation(fakeQuery);
    expect(result).toBe('query');
  });

  it('should trim and clean new lines from the query string', () => {
    const query = JSON.stringify({
      query: 'query GetUsers { GetUsers { id name } }\n',
    });
    const result = extractGraphQLOperation(query);
    expect(result).toBe('GetUsers');
  });

  it('should return "query" for a query without a specific operation name', () => {
    const query = JSON.stringify({ query: '{ query { id name } }' });
    const result = extractGraphQLOperation(query);
    expect(result).toBe('query');
  });
});
