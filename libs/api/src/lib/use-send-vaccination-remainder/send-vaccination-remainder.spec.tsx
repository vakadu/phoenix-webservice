import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useSendVaccinationRemainder from './send-vaccination-remainder';

describe('useSendVaccinationRemainder', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useSendVaccinationRemainder());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
