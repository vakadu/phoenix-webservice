import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useScrollPosition from './use-scroll-position';

describe('useScrollPosition', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useScrollPosition());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
