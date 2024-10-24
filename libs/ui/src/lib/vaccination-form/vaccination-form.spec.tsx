import { render } from '@testing-library/react';

import VaccinationForm from './vaccination-form';

describe('VaccinationForm', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<VaccinationForm />);
		expect(baseElement).toBeTruthy();
	});
});
