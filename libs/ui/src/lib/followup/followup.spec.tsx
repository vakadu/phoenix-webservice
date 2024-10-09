import { render } from '@testing-library/react';

import Followup from './followup';

describe('Followup', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Followup />);
		expect(baseElement).toBeTruthy();
	});
});
