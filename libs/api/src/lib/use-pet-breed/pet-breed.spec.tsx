import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePetBreed from './pet-breed';

describe('usePetBreed', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => usePetBreed());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
