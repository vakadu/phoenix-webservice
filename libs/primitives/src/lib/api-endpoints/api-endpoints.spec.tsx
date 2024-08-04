import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useApiEndpoints from './api-endpoints';

describe('useApiEndpoints', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useApiEndpoints());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
