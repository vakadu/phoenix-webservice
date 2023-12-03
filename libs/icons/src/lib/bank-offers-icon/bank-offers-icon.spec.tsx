import { render } from '@testing-library/react';

import BankOffersIcon from './bank-offers-icon';

describe('BankOffersIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BankOffersIcon />);
    expect(baseElement).toBeTruthy();
  });
});
