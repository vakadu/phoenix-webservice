import { render } from '@testing-library/react';

import CategoryLoader from './category-loader';

describe('CategoryLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryLoader />);
    expect(baseElement).toBeTruthy();
  });
});
