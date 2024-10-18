import { render } from '@testing-library/react';

import UpArrowIcon from './up-arrow-icon';

describe('UpArrowIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UpArrowIcon />);
		expect(baseElement).toBeTruthy();
	});
});
