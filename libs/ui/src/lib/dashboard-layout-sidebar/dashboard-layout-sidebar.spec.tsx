import { render } from '@testing-library/react';

import DashboardLayoutSidebar from './dashboard-layout-sidebar';

describe('DashboardLayoutSidebar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DashboardLayoutSidebar />);
		expect(baseElement).toBeTruthy();
	});
});
