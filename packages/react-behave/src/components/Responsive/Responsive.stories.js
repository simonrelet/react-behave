import { object, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { WithRef } from '../../../.storybook/components';
import Responsive from './Responsive';

const defaultScreenSizes = Responsive.defaultProps.screenSizes;

const stories = storiesOf('Responsive', module);

stories.add('Render function', () => {
  const screenSizes = object('Screen sizes', defaultScreenSizes);
  const screenSizesOptions = Object.keys(screenSizes).reduce(
    (acc, size) => ({ ...acc, [size]: size }),
    { '': 'None' },
  );

  return (
    <Responsive
      maximum={select('Maximum', screenSizesOptions, '')}
      minimum={select('Minimum', screenSizesOptions, '')}
      screenSizes={screenSizes}
    >
      {screenSize => (
        <div>
          <h3>The screen size is '{screenSize}'.</h3>
          <em>Use the "Viewport" and "Knobs" tabs bellow to play around.</em>
        </div>
      )}
    </Responsive>
  );
});

stories.add('Render children', () => (
  <Responsive maximum="md" minimum="sm">
    <p>I'm only visible on 'sm' and 'md' screens</p>
  </Responsive>
));

stories.add('Local responsiveness', () => (
  <WithRef>
    {(ref, element) => (
      <div ref={ref}>
        <Responsive target={element}>
          {(size, width) => (
            <p>
              The size is '{size}', width is {width}px
            </p>
          )}
        </Responsive>
      </div>
    )}
  </WithRef>
));
