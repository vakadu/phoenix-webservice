import { render } from '@testing-library/react';

import RadioFilledIcon from './radio-filled-icon';

describe('RadioFilledIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<RadioFilledIcon />);
		expect(baseElement).toBeTruthy();
	});
});
