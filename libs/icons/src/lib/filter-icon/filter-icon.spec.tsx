import { render } from '@testing-library/react';

import FilterIcon from './filter-icon';

describe('FilterIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterIcon />);
    expect(baseElement).toBeTruthy();
  });
});
