import { render } from '@testing-library/react';

import UseGetMedicalRecords from './use-get-medical-records';

describe('UseGetMedicalRecords', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UseGetMedicalRecords />);
		expect(baseElement).toBeTruthy();
	});
});
