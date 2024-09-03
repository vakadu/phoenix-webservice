import { render } from '@testing-library/react';

import ImagePlaceholderIcon from './image-placeholder-icon';

describe('ImagePlaceholderIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ImagePlaceholderIcon />);
		expect(baseElement).toBeTruthy();
	});
});
