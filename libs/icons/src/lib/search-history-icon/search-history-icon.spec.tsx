import { render } from '@testing-library/react';

import SearchHistoryIcon from './search-history-icon';

describe('SearchHistoryIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchHistoryIcon />);
    expect(baseElement).toBeTruthy();
  });
});
