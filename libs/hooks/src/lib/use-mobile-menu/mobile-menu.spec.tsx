import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useMobileMenu from './mobile-menu';

describe('useMobileMenu', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useMobileMenu());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
