import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from './Button';

const stories = storiesOf('Button', module);

stories.add('Basic button', () => (
  <Button disabled={boolean('Disabled', false)} onClick={action('onClick')}>
    {text('Label', 'Click me')}
  </Button>
));
