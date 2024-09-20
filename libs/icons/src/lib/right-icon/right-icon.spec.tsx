import { render } from '@testing-library/react';

import RightIcon from './right-icon';

describe('RightIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<RightIcon />);
		expect(baseElement).toBeTruthy();
	});
});
