import { render } from '@testing-library/react';

import WrongIcon from './wrong-icon';

describe('WrongIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<WrongIcon />);
		expect(baseElement).toBeTruthy();
	});
});
