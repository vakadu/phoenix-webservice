import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import userDetails from './user-details';

describe('useRDetails', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => userDetails());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
