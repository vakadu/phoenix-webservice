import { render } from '@testing-library/react';

import RightLongIcon from './right-long-icon';

describe('RightLongIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<RightLongIcon />);
		expect(baseElement).toBeTruthy();
	});
});
