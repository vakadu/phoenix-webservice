import { render } from '@testing-library/react';

import ImagePlaceholder from './image-placeholder';

describe('ImagePlaceholder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImagePlaceholder />);
    expect(baseElement).toBeTruthy();
  });
});
