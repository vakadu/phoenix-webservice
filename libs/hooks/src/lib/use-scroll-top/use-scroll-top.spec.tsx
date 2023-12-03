import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useScrollTop from './use-scroll-top';

describe('useScrollTop', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useScrollTop());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
