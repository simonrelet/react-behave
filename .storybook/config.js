import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { create } from '@storybook/theming'
import pkg from '../package.json'
import './styles.css'

const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(withKnobs)

addParameters({
  options: {
    panelPosition: 'right',
    sidebarAnimations: false,
    theme: create({
      base: 'light',
      brandTitle: pkg.name,
      brandUrl: pkg.homepage,
    }),
  },
})

configure(loadStories, module)
