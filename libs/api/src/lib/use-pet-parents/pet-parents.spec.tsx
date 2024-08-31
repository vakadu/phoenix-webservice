import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePetParents from './pet-parents';

describe('usePetParents', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => usePetParents());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
