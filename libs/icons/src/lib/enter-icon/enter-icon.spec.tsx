import { render } from '@testing-library/react';

import EnterIcon from './enter-icon';

describe('EnterIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<EnterIcon />);
		expect(baseElement).toBeTruthy();
	});
});
