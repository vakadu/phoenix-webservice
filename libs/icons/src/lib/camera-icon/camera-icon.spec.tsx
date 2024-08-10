import { render } from '@testing-library/react';

import CameraIcon from './camera-icon';

describe('CameraIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CameraIcon />);
		expect(baseElement).toBeTruthy();
	});
});
