/**
 * Get the display name of a component.
 *
 * ## Usage
 *
 * ```js
 * import { getDisplayName } from '@simonrelet/react-utils';
 * import MyComponent from './MyComponent';
 *
 * const displayName = getDisplayName(MyComponent);
 * ```
 *
 * @param {React.Component} component - The React component.
 * @returns {string} The component's name.
 */
function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default getDisplayName;
