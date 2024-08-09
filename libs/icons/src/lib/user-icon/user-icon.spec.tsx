import { render } from '@testing-library/react';

import UserIcon from './user-icon';

describe('UserIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UserIcon />);
		expect(baseElement).toBeTruthy();
	});
});
