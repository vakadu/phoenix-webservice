import { render } from '@testing-library/react';

import PhoneIcon from './phone-icon';

describe('PhoneIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<PhoneIcon />);
		expect(baseElement).toBeTruthy();
	});
});
