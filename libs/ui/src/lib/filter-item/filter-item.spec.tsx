import { render } from '@testing-library/react';

import FilterItem from './filter-item';

describe('FilterItem', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<FilterItem />);
		expect(baseElement).toBeTruthy();
	});
});
