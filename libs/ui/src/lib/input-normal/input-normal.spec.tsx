import { render } from '@testing-library/react';

import InputNormal from './input-normal';

describe('InputNormal', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<InputNormal />);
		expect(baseElement).toBeTruthy();
	});
});
