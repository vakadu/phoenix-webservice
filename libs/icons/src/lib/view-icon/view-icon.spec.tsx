import { render } from '@testing-library/react';

import ViewIcon from './view-icon';

describe('ViewIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ViewIcon />);
		expect(baseElement).toBeTruthy();
	});
});
