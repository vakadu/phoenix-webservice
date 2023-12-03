import { render } from '@testing-library/react';

import DeleteIcon from './delete-icon';

describe('DeleteIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DeleteIcon />);
		expect(baseElement).toBeTruthy();
	});
});
