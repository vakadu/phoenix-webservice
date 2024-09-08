import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCreateVaccinationRecords from './create-vaccination-records';

describe('useCreateVaccinationRecords', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCreateVaccinationRecords());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
