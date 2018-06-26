import defaultTheme from './defaultTheme';
import mergeWith from 'lodash.mergewith';

function merger(baseObject, replacementObject) {
  if (Array.isArray(baseObject)) {
    // Arrays are replaced, not concatenated.
    return replacementObject;
  }

  // Let `mergeWith` handle the other cases.
  return undefined;
}

function createTheme(theme = {}) {
  return mergeWith({}, defaultTheme, theme, merger);
}

export default createTheme;
