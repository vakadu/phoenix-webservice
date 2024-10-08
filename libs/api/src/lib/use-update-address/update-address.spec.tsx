import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateAddress from './update-address';

describe('useUpdateAddress', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateAddress());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
