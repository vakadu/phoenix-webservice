import { render } from '@testing-library/react';

import UpIcon from './up-icon';

describe('UpIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UpIcon />);
		expect(baseElement).toBeTruthy();
	});
});
