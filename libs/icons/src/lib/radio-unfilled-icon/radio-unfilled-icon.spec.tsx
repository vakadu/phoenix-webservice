import { render } from '@testing-library/react';

import RadioUnfilledIcon from './radio-unfilled-icon';

describe('RadioUnfilledIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<RadioUnfilledIcon />);
		expect(baseElement).toBeTruthy();
	});
});
