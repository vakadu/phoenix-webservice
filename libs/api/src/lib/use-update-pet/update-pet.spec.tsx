import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdatePet from './update-pet';

describe('useUpdatePet', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdatePet());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
