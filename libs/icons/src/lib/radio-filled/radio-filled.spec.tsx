import { render } from '@testing-library/react';

import RadioFilled from './radio-filled';

describe('RadioFilled', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<RadioFilled />);
		expect(baseElement).toBeTruthy();
	});
});
