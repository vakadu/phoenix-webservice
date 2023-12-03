import { render } from '@testing-library/react';

import CloseIcon from './close-icon';

describe('CloseIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CloseIcon />);
		expect(baseElement).toBeTruthy();
	});
});
