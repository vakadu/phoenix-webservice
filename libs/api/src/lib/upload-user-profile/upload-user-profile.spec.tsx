import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUploadUserProfile from './upload-user-profile';

describe('useUploadUserProfile', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUploadUserProfile());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
