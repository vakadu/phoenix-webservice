import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useInview from './use-inview';

describe('useInview', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useInview());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
