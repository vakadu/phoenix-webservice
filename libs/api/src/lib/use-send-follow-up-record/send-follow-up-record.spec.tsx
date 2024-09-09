import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useSendFollowUpRecord from './send-follow-up-record';

describe('useSendFollowUpRecord', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useSendFollowUpRecord());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
