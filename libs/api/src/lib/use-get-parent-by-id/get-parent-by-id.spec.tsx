import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetParentById from './get-parent-by-id';

describe('useGetParentById', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetParentById());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
