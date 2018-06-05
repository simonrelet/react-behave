import { checkA11y } from '@storybook/addon-a11y';
import backgrounds from '@storybook/addon-backgrounds';
import centered from '@storybook/addon-centered';
import { withConsole } from '@storybook/addon-console';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import pkg from '../package.json';

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator((story, context) => withConsole()(story)(context));
addDecorator(checkA11y);
addDecorator(
  backgrounds([
    { name: 'Default', value: '#fafafa', default: true },
    { name: 'Dark', value: '#424242' },
    { name: 'Paper', value: '#fff' },
  ]),
);

addDecorator(centered);

setOptions({
  name: pkg.name,
});

configure(loadStories, module);
