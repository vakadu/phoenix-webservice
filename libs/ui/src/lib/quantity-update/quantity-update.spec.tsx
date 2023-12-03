import { render } from '@testing-library/react';

import QuantityUpdate from './quantity-update';

describe('QuantityUpdate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuantityUpdate />);
    expect(baseElement).toBeTruthy();
  });
});
