import { render } from '@testing-library/react';

import OrdersIcon from './orders-icon';

describe('OrdersIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrdersIcon />);
    expect(baseElement).toBeTruthy();
  });
});
