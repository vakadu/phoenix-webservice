import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUpdatePetImage from './update-pet-image';

describe('useUpdatePetImage', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUpdatePetImage());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
