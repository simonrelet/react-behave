import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DropDown from './DropDown';

const stories = storiesOf('DropDown', module);

stories.add('Render prop', () => (
  <DropDown
    open={boolean('Open', true)}
    onClickOutside={action('onClickOutside')}
    render={({ ref, style }) => (
      <ul ref={ref} style={style}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    )}
  >
    {({ ref }) => <button ref={ref}>Click me</button>}
  </DropDown>
));

const MyDropDown = React.forwardRef(({ style }, ref) => {
  return (
    <ul ref={ref} style={style}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  );
});

stories.add('Using components', () => (
  <DropDown
    open={boolean('Open', true)}
    onClickOutside={action('onClickOutside')}
    component={MyDropDown}
  >
    {({ ref }) => <button ref={ref}>Click me</button>}
  </DropDown>
));
