import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetFollowRecords from './get-follow-records';

describe('useGetFollowRecords', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetFollowRecords());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
