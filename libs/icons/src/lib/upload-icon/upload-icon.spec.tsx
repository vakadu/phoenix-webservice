import { render } from '@testing-library/react';

import UploadIcon from './upload-icon';

describe('UploadIcon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UploadIcon />);
		expect(baseElement).toBeTruthy();
	});
});
