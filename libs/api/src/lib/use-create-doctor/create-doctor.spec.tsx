import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCreateDoctor from './create-doctor';

describe('useCreateDoctor', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCreateDoctor());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
