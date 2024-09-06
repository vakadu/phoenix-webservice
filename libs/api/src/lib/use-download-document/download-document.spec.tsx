import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useDownloadDocument from './download-document';

describe('useDownloadDocument', () => {
	it('should render successfully', () => {
		const { result } = renderHook(() => useDownloadDocument());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
});
