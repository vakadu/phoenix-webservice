import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateStaff from './update-staff';

describe('useUpdateStaff', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateStaff());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
