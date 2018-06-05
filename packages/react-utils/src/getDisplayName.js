/**
 * Get the display name of a component.
 * @param {React.Component} component - The React component.
 * @returns {string} The component's name.
 */
function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default getDisplayName;
