import { render } from '@testing-library/react';

import ShowSidebar from './show-sidebar';

describe('ShowSidebar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ShowSidebar />);
		expect(baseElement).toBeTruthy();
	});
});
