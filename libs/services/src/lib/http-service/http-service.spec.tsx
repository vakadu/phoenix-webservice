import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useHttpService from './http-service';

describe('useHttpService', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useHttpService());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
