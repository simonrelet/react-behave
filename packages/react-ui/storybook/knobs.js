import { select } from '@storybook/addon-knobs'
import changeCase from 'change-case'

export const allColors = [
  'black',
  'white',
  'grey',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
]

export function color(label, defaultValue, groupID) {
  const colors = ['', ...allColors.map(c => changeCase.sentenceCase(c))]

  return select(label, colors, defaultValue || colors[0], groupID).toLowerCase()
}
