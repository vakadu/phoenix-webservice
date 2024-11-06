import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UsePetCertificateVaccination from './use-pet-certificate-vaccination';

describe('UsePetCertificateVaccination', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => UsePetCertificateVaccination());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
