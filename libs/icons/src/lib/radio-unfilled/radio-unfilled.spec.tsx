import { render } from '@testing-library/react';

import RadioUnfilled from './radio-unfilled';

describe('RadioUnfilled', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<RadioUnfilled />);
		expect(baseElement).toBeTruthy();
	});
});
