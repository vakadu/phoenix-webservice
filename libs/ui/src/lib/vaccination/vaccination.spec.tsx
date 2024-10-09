import { render } from '@testing-library/react';

import Vaccination from './vaccination';

describe('Vaccination', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Vaccination />);
		expect(baseElement).toBeTruthy();
	});
});
