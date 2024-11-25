import { render } from '@testing-library/react';

import HealthCertificate from './health-certificate';

describe('HealthCertificate', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<HealthCertificate />);
		expect(baseElement).toBeTruthy();
	});
});
