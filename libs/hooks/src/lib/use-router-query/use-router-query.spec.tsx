import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useRouterQuery from './use-router-query';

describe('useRouterQuery', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useRouterQuery());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
