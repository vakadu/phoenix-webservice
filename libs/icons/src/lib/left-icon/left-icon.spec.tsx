import { render } from '@testing-library/react';

import LeftIcon from './left-icon';

describe('LeftIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<LeftIcon />);
		expect(baseElement).toBeTruthy();
	});
});
