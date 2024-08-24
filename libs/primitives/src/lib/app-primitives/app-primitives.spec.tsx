import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useAppPrimitives from './app-primitives';

describe('useAppPrimitives', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useAppPrimitives());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
