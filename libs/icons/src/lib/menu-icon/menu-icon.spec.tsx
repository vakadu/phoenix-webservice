import { render } from '@testing-library/react';

import MenuIcon from './menu-icon';

describe('MenuIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MenuIcon />);
		expect(baseElement).toBeTruthy();
	});
});
