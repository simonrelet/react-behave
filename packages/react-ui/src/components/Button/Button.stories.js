import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button, { severities } from './Button';
import { allIcons } from '../../icons';

const stories = storiesOf('Button', module);

const iconsOptions = ['None', ...allIcons.map(icon => icon.name)];

function renderIcon(side) {
  return () => {
    const iconName = select(`${side} icon`, iconsOptions, 'None');
    const Icon = allIcons.find(icon => icon.name === iconName);
    return Icon ? <Icon.component /> : null;
  };
}

stories.add('Dynamic button', () => (
  <Button
    dense={boolean('Dense', false)}
    onClick={action('onClick')}
    renderIconLeft={renderIcon('Left')}
    renderIconRight={renderIcon('Right')}
    severity={select('Severity', severities, severities[0])}
  >
    {text('Label', 'Click me')}
  </Button>
));
