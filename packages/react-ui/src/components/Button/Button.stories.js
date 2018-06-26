import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import changeCase from 'change-case';
import React from 'react';
import styled from 'styled-components';
import { allColors, color } from '../../../storybook/knobs';
import { allIcons } from '../../icons';
import Button from './Button';

const stories = storiesOf('Button', module);

const iconsOptions = ['None', ...allIcons.map(icon => icon.name)];

function renderIcon(side) {
  return () => {
    const iconName = select(`${side} icon`, iconsOptions, 'None');
    const Icon = allIcons.find(icon => icon.name === iconName);
    return Icon ? <Icon.component /> : null;
  };
}

const Row = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: ${p => p.theme.spacing()};
  }
`;

stories.add('Button colors', () => (
  <Row>
    {allColors.map(c => (
      <Button key={c} onClick={action('onClick')} color={c}>
        {changeCase.sentenceCase(c)}
      </Button>
    ))}
  </Row>
));

stories.add('Dynamic button', () => (
  <Button
    dense={boolean('Dense', false)}
    onClick={action('onClick')}
    renderIconLeft={renderIcon('Left')}
    renderIconRight={renderIcon('Right')}
    color={color('Color')}
  >
    {text('Label', 'Click me')}
  </Button>
));
