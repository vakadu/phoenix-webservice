import { render } from '@testing-library/react';

import DietIcon from './diet-icon';

describe('DietIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DietIcon />);
		expect(baseElement).toBeTruthy();
	});
});
