import { render } from '@testing-library/react';

import DownIcon from './down-icon';

describe('DownIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DownIcon />);
		expect(baseElement).toBeTruthy();
	});
});
