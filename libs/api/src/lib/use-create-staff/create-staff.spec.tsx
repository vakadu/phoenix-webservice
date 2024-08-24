import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCreateStaff from './create-staff';

describe('useCreateStaff', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCreateStaff());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
