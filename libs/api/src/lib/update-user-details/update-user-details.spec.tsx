import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateUserDetails from './update-user-details';

describe('useUpdateUserDetails', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateUserDetails());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
