import { render } from '@testing-library/react';

import HideSidebar from './hide-sidebar';

describe('HideSidebar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<HideSidebar />);
		expect(baseElement).toBeTruthy();
	});
});
