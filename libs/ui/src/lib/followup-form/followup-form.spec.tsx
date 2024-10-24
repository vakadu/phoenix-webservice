import { render } from '@testing-library/react';

import FollowupForm from './followup-form';

describe('FollowupForm', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<FollowupForm />);
		expect(baseElement).toBeTruthy();
	});
});
