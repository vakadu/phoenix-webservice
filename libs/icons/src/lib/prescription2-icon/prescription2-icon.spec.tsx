import { render } from '@testing-library/react';

import Prescription2Icon from './prescription2-icon';

describe('Prescription2Icon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Prescription2Icon />);
		expect(baseElement).toBeTruthy();
	});
});
