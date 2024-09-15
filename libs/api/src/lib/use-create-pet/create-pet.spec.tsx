import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCreatePet from './create-pet';

describe('useCreatePet', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useCreatePet());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
