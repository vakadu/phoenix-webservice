import { render } from '@testing-library/react';

import TopIcon from './top-icon';

describe('TopIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopIcon />);
    expect(baseElement).toBeTruthy();
  });
});
