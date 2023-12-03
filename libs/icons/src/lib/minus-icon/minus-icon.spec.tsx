import { render } from '@testing-library/react';

import MinusIcon from './minus-icon';

describe('MinusIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MinusIcon />);
		expect(baseElement).toBeTruthy();
	});
});
