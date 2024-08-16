import { render } from '@testing-library/react';

import BoxLoader from './box-loader';

describe('BoxLoader', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<BoxLoader />);
		expect(baseElement).toBeTruthy();
	});
});
