import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePincode from './pincode';

describe('usePincode', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => usePincode());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
