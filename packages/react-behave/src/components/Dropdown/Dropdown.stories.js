import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Dropdown from './Dropdown';

const stories = storiesOf('Dropdown', module);

stories.add('Render functions', () => (
  <Dropdown
    onClickOutside={action('onClickOutside')}
    open={boolean('Open', true)}
    renderDropDown={(ref, { style }) => (
      <ul ref={ref} style={style}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    )}
  >
    {ref => <button ref={ref}>Click me</button>}
  </Dropdown>
));

stories.add('Without onClickOutside', () => (
  <Dropdown
    open={boolean('Open', true)}
    renderDropDown={(ref, { style }) => (
      <ul ref={ref} style={style}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    )}
  >
    {ref => <button ref={ref}>Click me</button>}
  </Dropdown>
));
