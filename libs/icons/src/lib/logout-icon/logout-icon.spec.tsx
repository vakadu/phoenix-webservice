import { render } from '@testing-library/react';

import LogoutIcon from './logout-icon';

describe('LogoutIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<LogoutIcon />);
		expect(baseElement).toBeTruthy();
	});
});
