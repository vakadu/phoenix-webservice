import { render } from '@testing-library/react';

import SearchParentsModal from './search-parents-modal';

describe('SearchParentsModal', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<SearchParentsModal />);
		expect(baseElement).toBeTruthy();
	});
});
