import { render } from '@testing-library/react';

import MedicalRecord from './medical-record';

describe('MedicalRecord', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MedicalRecord />);
		expect(baseElement).toBeTruthy();
	});
});
