import { render } from '@testing-library/react';

import DotIcon from './dot-icon';

describe('DotIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DotIcon />);
    expect(baseElement).toBeTruthy();
  });
});
