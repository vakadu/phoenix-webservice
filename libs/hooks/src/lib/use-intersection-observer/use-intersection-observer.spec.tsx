import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useIntersectionObserver from './use-intersection-observer';

describe('useIntersectionObserver', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
