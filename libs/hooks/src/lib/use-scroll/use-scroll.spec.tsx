import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useScroll from './use-scroll';

describe('useScroll', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useScroll());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
