import { render } from '@testing-library/react';

import NotesIcon from './notes-icon';

describe('NotesIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<NotesIcon />);
		expect(baseElement).toBeTruthy();
	});
});
