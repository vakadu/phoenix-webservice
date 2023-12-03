import { render } from '@testing-library/react';

import FlashIcon from './flash-icon';

describe('FlashIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlashIcon />);
    expect(baseElement).toBeTruthy();
  });
});
