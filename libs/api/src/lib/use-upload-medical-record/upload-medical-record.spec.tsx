import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUploadMedicalRecord from './upload-medical-record';

describe('useUploadMedicalRecord', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useUploadMedicalRecord());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
