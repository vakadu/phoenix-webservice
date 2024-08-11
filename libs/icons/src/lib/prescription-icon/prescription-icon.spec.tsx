import { render } from '@testing-library/react';

import PrescriptionIcon from './prescription-icon';

describe('PrescriptionIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<PrescriptionIcon />);
		expect(baseElement).toBeTruthy();
	});
});
