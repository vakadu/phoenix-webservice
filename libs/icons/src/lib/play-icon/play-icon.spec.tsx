import { render } from '@testing-library/react';

import PlayIcon from './play-icon';

describe('PlayIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<PlayIcon />);
		expect(baseElement).toBeTruthy();
	});
});
