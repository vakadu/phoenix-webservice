import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetDoctors from './get-doctors';

describe('useGetDoctors', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetDoctors());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
