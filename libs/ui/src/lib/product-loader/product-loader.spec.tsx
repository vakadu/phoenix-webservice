import { render } from '@testing-library/react';

import ProductLoader from './product-loader';

describe('ProductLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductLoader />);
    expect(baseElement).toBeTruthy();
  });
});
