import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useDebounce from './use-debounce';

describe('useDebounce', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useDebounce());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
