import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetPetById from './get-pet-by-id';

describe('useGetPetById', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetPetById());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
