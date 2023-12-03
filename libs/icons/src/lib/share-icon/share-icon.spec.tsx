import { render } from '@testing-library/react';

import ShareIcon from './share-icon';

describe('ShareIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ShareIcon />);
		expect(baseElement).toBeTruthy();
	});
});
