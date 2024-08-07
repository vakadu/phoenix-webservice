import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useRtl from './rtl';

describe('useRtl', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useRtl());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
