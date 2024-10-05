import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetFollowupList from './get-followup-list';

describe('useGetFollowupList', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetFollowupList());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
