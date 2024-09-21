import { render } from '@testing-library/react';

import UserOutlineIcon from './user-outline-icon';

describe('UserOutlineIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UserOutlineIcon />);
		expect(baseElement).toBeTruthy();
	});
});
