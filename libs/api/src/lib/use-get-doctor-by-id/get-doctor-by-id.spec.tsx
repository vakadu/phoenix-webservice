import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetDoctorById from './get-doctor-by-id';

describe('useGetDoctorById', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetDoctorById());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
