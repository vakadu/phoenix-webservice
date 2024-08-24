import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateClinicMemberProfile from './update-clinic-member-profile';

describe('useUpdateClinicMemberProfile', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateClinicMemberProfile());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
