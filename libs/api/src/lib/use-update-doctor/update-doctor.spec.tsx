import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateDoctor from './update-doctor';

describe('useUpdateDoctor', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateDoctor());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
