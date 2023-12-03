import { render } from '@testing-library/react';

import OptionsIcon from './options-icon';

describe('OptionsIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<OptionsIcon />);
		expect(baseElement).toBeTruthy();
	});
});
