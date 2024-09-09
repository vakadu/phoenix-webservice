import { render } from '@testing-library/react';

import LoadingIcon from './loading-icon';

describe('LoadingIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<LoadingIcon />);
		expect(baseElement).toBeTruthy();
	});
});
