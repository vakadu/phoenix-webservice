import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCreateParent from './create-parent';

describe('useCreateParent', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCreateParent());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
