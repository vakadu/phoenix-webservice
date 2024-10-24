import { render } from '@testing-library/react';

import FollowForm from './follow-form';

describe('FollowForm', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<FollowForm />);
		expect(baseElement).toBeTruthy();
	});
});
