import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useSignin from './signin';

describe('useSignin', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useSignin());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
