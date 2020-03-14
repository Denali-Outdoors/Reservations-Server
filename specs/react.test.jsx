/* eslint-disable no-undef */

import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../client/src/components/App';
import Calendar from '../client/src/components/Calendar';

describe('<App />', () => {
  it('should render one Calendar component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Calendar)).toHaveLength(1);
  });
});
