import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { withConsole } from '@storybook/addon-console';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import { GlobalTheme, ThemeProvider, createTheme } from '../src';
import pkg from '../package.json';

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator((story, context) => withConsole()(story)(context));
addDecorator(withKnobs);
addDecorator(checkA11y);

addDecorator(story => (
  <ThemeProvider theme={createTheme()}>
    <GlobalTheme>{story()}</GlobalTheme>
  </ThemeProvider>
));

// Center content
addDecorator(story => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    {story()}
  </div>
));

setOptions({
  name: pkg.name,
});

configure(loadStories, module);
