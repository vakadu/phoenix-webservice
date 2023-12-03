import { render } from '@testing-library/react';

import PlusIcon from './plus-icon';

describe('PlusIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<PlusIcon />);
		expect(baseElement).toBeTruthy();
	});
});
