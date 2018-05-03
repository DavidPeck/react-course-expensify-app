import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

// react-test-renderer

test('should render Header coorectly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});