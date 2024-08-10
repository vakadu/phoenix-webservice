import { render } from '@testing-library/react';

import MailIcon from './mail-icon';

describe('MailIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MailIcon />);
		expect(baseElement).toBeTruthy();
	});
});
