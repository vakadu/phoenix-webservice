import { render } from '@testing-library/react';

import Moon from './moon';

describe('Moon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Moon />);
		expect(baseElement).toBeTruthy();
	});
});
