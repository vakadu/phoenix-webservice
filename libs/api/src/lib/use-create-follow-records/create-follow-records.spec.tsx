import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCreateFollowRecords from './create-follow-records';

describe('useCreateFollowRecords', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCreateFollowRecords());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
