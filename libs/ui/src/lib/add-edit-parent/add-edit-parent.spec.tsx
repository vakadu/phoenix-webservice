import { render } from '@testing-library/react';

import AddEditParent from './add-edit-parent';

describe('AddEditParent', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<AddEditParent />);
		expect(baseElement).toBeTruthy();
	});
});
