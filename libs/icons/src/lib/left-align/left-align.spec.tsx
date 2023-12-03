import { render } from '@testing-library/react';

import LeftAlign from './left-align';

describe('LeftAlign', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<LeftAlign />);
		expect(baseElement).toBeTruthy();
	});
});
