import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateVaccinationRecord from './update-vaccination-record';

describe('useUpdateVaccinationRecord', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateVaccinationRecord());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
