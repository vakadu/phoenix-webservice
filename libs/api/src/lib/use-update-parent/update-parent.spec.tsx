import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdateParent from './update-parent';

describe('useUpdateParent', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdateParent());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
