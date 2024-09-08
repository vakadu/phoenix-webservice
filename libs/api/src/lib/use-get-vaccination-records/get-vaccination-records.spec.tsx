import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetVaccinationRecords from './get-vaccination-records';

describe('useGetVaccinationRecords', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetVaccinationRecords());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
