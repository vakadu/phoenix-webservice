import { render } from '@testing-library/react';

import RightAlign from './right-align';

describe('RightAlign', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<RightAlign />);
		expect(baseElement).toBeTruthy();
	});
});
