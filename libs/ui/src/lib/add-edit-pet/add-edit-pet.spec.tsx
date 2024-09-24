import { render } from '@testing-library/react';

import AddEditPet from './add-edit-pet';

describe('AddEditPet', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<AddEditPet />);
		expect(baseElement).toBeTruthy();
	});
});
