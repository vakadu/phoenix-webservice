import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetOtp from './get-otp';

describe('useGetOtp', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetOtp());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
