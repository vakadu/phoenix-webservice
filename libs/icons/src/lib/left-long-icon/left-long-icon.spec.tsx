import { render } from '@testing-library/react';

import LeftLongIcon from './left-long-icon';

describe('LeftLongIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<LeftLongIcon />);
		expect(baseElement).toBeTruthy();
	});
});
