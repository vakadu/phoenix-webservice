import { render } from '@testing-library/react';

import TextLoader from './text-loader';

describe('TextLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextLoader />);
    expect(baseElement).toBeTruthy();
  });
});
