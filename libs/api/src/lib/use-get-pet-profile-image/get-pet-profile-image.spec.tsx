import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetPetProfileImage from './get-pet-profile-image';

describe('useGetPetProfileImage', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useGetPetProfileImage());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
