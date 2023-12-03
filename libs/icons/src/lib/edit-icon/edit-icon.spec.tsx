import { render } from '@testing-library/react';

import EditIcon from './edit-icon';

describe('EditIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<EditIcon />);
		expect(baseElement).toBeTruthy();
	});
});
