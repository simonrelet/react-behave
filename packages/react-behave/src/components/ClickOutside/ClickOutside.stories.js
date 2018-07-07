import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ClickOutside from './ClickOutside';

const stories = storiesOf('ClickOutside', module);

const style = {
  border: '1px solid #ccc',
  padding: '0.5rem 1rem',
};

stories.add('Render function', () => (
  <ClickOutside onClickOutside={action('onClickOutside')}>
    {ref => (
      <p ref={ref} style={style}>
        Don't click on me.
      </p>
    )}
  </ClickOutside>
));
