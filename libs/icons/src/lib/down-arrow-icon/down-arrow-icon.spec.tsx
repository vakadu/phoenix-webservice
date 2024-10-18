import { render } from '@testing-library/react';

import DownArrowIcon from './down-arrow-icon';

describe('DownArrowIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DownArrowIcon />);
		expect(baseElement).toBeTruthy();
	});
});
