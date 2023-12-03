import { render } from '@testing-library/react';

import Sun from './sun';

describe('Sun', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Sun />);
		expect(baseElement).toBeTruthy();
	});
});
