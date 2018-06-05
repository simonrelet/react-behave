import { object, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Responsive from './Responsive';

const defaultScreenSizes = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const stories = storiesOf('Responsive', module);

stories.add('Render function', () => {
  const screenSizes = object('Screen sizes', defaultScreenSizes);
  const screenSizesOptions = Object.keys(screenSizes).reduce(
    (acc, size) => ({ ...acc, [size]: size }),
    { '': 'None' },
  );

  return (
    <Responsive
      down={select('Down', screenSizesOptions, '')}
      up={select('Up', screenSizesOptions, '')}
      screenSizes={screenSizes}
      render={width => (
        <div>
          <h3>The width is '{width}'.</h3>
          <em>Use the "Viewport" and "Knobs" tabs bellow to play around.</em>
        </div>
      )}
    />
  );
});

stories.add('Render children', () => (
  <Responsive down="md" up="sm" screenSizes={defaultScreenSizes}>
    <p>I'm only visible on 'sm' and 'md' screens</p>
  </Responsive>
));
