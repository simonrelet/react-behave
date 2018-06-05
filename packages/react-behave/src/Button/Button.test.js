import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('<Button />', () => {
  it('renders correctly', () => {
    const props = { a: 0, b: 'b' };
    const tree = renderer.create(<Button {...props}>Click me</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
