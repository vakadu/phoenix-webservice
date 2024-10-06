import { render } from '@testing-library/react';

import DashboardLayoutHeader from './dashboard-layout-header';

describe('DashboardLayoutHeader', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DashboardLayoutHeader />);
		expect(baseElement).toBeTruthy();
	});
});
