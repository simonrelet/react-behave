import { storiesOf } from '@storybook/react';
import React from 'react';
import { WithRef } from '../../../.storybook/components';
import ResizeObserver from './ResizeObserver';

const stories = storiesOf('ResizeObserver', module);

stories.add('Basic usage', () => (
  <WithRef>
    {(ref, element) => (
      <ResizeObserver target={element}>
        {({ height, width }) => (
          <div ref={ref}>
            <h3>
              The width is {width}px, and height {height}px.
            </h3>
            <em>Use the "Viewport" and "Knobs" tabs bellow to play around.</em>
          </div>
        )}
      </ResizeObserver>
    )}
  </WithRef>
));
