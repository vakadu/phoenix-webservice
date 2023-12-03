import { render } from '@testing-library/react';

import SortIcon from './sort-icon';

describe('SortIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SortIcon />);
    expect(baseElement).toBeTruthy();
  });
});
