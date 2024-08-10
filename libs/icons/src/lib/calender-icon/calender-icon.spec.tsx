import { render } from '@testing-library/react';

import CalenderIcon from './calender-icon';

describe('CalenderIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CalenderIcon />);
		expect(baseElement).toBeTruthy();
	});
});
