import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useThemeConfig from './theme-config';

describe('useThemeConfig', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useThemeConfig());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
