import { render } from '@testing-library/react';

import LoadingModal from './loading-modal';

describe('LoadingModal', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<LoadingModal />);
		expect(baseElement).toBeTruthy();
	});
});
