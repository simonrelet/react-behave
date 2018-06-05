import omit from 'lodash.omit';

/**
 * Extract the props that are not defined in the `propTypes` of a component.
 * @param {React.Component} component - The React component.
 * @param {Object} props - The props of the component.
 * @returns {Object} The other props.
 */
function getOtherProps(component, props) {
  return omit(props, Object.keys(component.propTypes));
}

export default getOtherProps;
