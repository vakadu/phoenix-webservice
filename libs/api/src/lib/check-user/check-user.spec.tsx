import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCheckUser from './check-user';

describe('useCheckUser', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCheckUser());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
