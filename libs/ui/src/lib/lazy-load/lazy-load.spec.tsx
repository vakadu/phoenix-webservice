import { render } from '@testing-library/react';

import LazyLoad from './lazy-load';

describe('LazyLoad', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LazyLoad />);
    expect(baseElement).toBeTruthy();
  });
});
