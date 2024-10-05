import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetVaccinationList from './get-vaccination-list';

describe('useGetVaccinationList', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetVaccinationList());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
