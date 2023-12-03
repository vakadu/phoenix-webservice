import { render } from '@testing-library/react';

import UpDownIcon from './up-down-icon';

describe('UpDownIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpDownIcon />);
    expect(baseElement).toBeTruthy();
  });
});
