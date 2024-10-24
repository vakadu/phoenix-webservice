import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetDropdownList from './get-dropdown-list';

describe('useGetDropdownList', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetDropdownList());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
