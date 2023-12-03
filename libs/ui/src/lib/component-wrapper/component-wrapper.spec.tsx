import { render } from '@testing-library/react';

import ComponentWrapper from './component-wrapper';

describe('ComponentWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
