import { render } from '@testing-library/react';

import WebIcon from './web-icon';

describe('WebIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<WebIcon />);
		expect(baseElement).toBeTruthy();
	});
});
