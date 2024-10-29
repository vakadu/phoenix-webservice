import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetBrowserType from './get-browser-type';

describe('useGetBrowserType', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetBrowserType());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
