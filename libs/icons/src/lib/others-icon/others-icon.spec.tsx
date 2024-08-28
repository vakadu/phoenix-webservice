import { render } from '@testing-library/react';

import OthersIcon from './others-icon';

describe('OthersIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<OthersIcon />);
		expect(baseElement).toBeTruthy();
	});
});
