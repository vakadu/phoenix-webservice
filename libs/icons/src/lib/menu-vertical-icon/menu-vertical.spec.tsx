import { render } from '@testing-library/react';

import MenuVertical from './menu-vertical';

describe('MenuVertical', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MenuVertical />);
		expect(baseElement).toBeTruthy();
	});
});
