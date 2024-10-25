import { render } from '@testing-library/react';

import TickSuccessIcon from './tick-success-icon';

describe('TickSuccessIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TickSuccessIcon />);
		expect(baseElement).toBeTruthy();
	});
});
