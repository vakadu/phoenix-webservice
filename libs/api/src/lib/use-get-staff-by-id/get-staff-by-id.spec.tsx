import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetStaffById from './get-staff-by-id';

describe('useGetStaffById', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetStaffById());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
