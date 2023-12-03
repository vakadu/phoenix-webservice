import { render } from '@testing-library/react';

import CartIcon from './cart-icon';

describe('CartIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CartIcon />);
		expect(baseElement).toBeTruthy();
	});
});
