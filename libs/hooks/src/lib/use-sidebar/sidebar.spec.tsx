import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useSidebar from './sidebar';

describe('useSidebar', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useSidebar());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
