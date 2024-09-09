import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useUrlState from './useUrlState';

describe('useUrlState', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUrlState());

    expect(result.current.url).toBe('');
    expect(result.current.method).toBe('GET');
    expect(result.current.headers).toEqual([
      { keyHeader: '', valueHeader: '' },
    ]);
    expect(result.current.params).toEqual([{ keyParam: '', valueParam: '' }]);
    expect(result.current.body).toBe('');
  });

  it('should update the URL when parameters are changed', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.setParams([
        { keyParam: 'foo', valueParam: 'bar' },
        { keyParam: 'baz', valueParam: 'qux' },
      ]);
    });

    expect(result.current.url).toContain('?foo=bar&baz=qux');
  });

  it('should update the headers when headers are changed', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.setHeaders([
        { keyHeader: 'Authorization', valueHeader: 'Bearer token' },
      ]);
    });

    expect(result.current.headers).toEqual([
      { keyHeader: 'Authorization', valueHeader: 'Bearer token' },
    ]);
  });

  it('should encode URL when generateAndSetUrl is called', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.setUrl('https://example.com/api');
      result.current.setMethod('POST');
      result.current.setHeaders([
        { keyHeader: 'Authorization', valueHeader: 'Bearer token' },
      ]);
      result.current.setParams([{ keyParam: 'id', valueParam: '123' }]);

      result.current.generateAndSetUrl();
    });
    expect(result.current.url).toContain('https://example.com/api');
  });
});
