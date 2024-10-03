import { render } from '@testing-library/react';

import PhoneOutlineIcon from './phone-outline-icon';

describe('PhoneOutlineIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<PhoneOutlineIcon />);
		expect(baseElement).toBeTruthy();
	});
});
