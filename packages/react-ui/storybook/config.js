import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import backgrounds from '@storybook/addon-backgrounds';
import centered from '@storybook/addon-centered';
import { withConsole } from '@storybook/addon-console';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import { AppTheme, ThemeProvider, createTheme } from '../src';
import pkg from '../package.json';

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const theme = createTheme();

addDecorator(withKnobs);
addDecorator((story, context) => withConsole()(story)(context));
addDecorator(checkA11y);

addDecorator(
  backgrounds(
    Object.keys(theme.palette.background).map(key => ({
      name: key,
      value: theme.palette.background[key],
      default: key === 'app',
    })),
  ),
);

addDecorator(story => (
  <ThemeProvider theme={createTheme()}>
    <AppTheme inheritBackground>{story()}</AppTheme>
  </ThemeProvider>
));

addDecorator(centered);

setOptions({
  name: pkg.name,
});

configure(loadStories, module);
