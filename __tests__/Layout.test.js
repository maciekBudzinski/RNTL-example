import React from 'react';
import { Layout } from 'components';
import { render } from 'react-native-testing-library';

describe('Components: Layout', () => {
  it('Should match snapshot', () => {
    const wrapper = render(<Layout />);

    expect(wrapper).toMatchSnapshot();
  });
});
