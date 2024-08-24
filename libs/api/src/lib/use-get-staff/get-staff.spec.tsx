import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetStaff from './get-staff';

describe('useGetStaff', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetStaff());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
