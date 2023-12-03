import { render } from '@testing-library/react';

import TickIcon from './tick-icon';

describe('TickIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TickIcon />);
		expect(baseElement).toBeTruthy();
	});
});
