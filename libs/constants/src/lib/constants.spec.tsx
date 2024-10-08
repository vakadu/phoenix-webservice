import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useConstants from './constants';

describe('useConstants', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useConstants());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
