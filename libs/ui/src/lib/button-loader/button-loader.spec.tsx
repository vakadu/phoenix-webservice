import { render } from '@testing-library/react';

import ButtonLoader from './button-loader';

describe('ButtonLoader', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ButtonLoader />);
		expect(baseElement).toBeTruthy();
	});
});
