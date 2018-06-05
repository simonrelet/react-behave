import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DropDown from './DropDown';

const stories = storiesOf('DropDown', module);

stories.add('Render functions', () => (
  <DropDown
    onClickOutside={action('onClickOutside')}
    open={boolean('Open', true)}
    render={ref => <button ref={ref}>Click me</button>}
    renderDropDown={(ref, { style }) => (
      <ul ref={ref} style={style}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    )}
  />
));

stories.add('Without onClickOutside', () => (
  <DropDown
    open={boolean('Open', true)}
    render={ref => <button ref={ref}>Click me</button>}
    renderDropDown={(ref, { style }) => (
      <ul ref={ref} style={style}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    )}
  />
));
