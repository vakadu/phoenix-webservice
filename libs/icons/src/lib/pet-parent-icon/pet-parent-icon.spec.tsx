import { render } from '@testing-library/react';

import PetParentIcon from './pet-parent-icon';

describe('PetParentIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<PetParentIcon />);
		expect(baseElement).toBeTruthy();
	});
});
