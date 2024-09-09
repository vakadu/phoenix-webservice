import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateFollowUpRecord from './update-follow-up-record';

describe('useUpdateFollowUpRecord', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateFollowUpRecord());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
