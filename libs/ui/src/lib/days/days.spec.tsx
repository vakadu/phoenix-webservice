import { render } from '@testing-library/react';

import Days from './days';

describe('Days', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Days />);
		expect(baseElement).toBeTruthy();
	});
});
