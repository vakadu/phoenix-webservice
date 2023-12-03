import { render } from '@testing-library/react';

import ItemLoader from './item-loader';

describe('ItemLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ItemLoader />);
    expect(baseElement).toBeTruthy();
  });
});
