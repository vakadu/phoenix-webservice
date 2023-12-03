import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useRazorpay from './use-razorpay';

describe('useRazorpay', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useRazorpay());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
