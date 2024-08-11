import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCreateAddress from './create-address';

describe('useCreateAddress', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCreateAddress());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
