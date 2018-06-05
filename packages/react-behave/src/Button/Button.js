import PropTypes from 'prop-types';
import React from 'react';

function Button({ children, ...otherProps }) {
  return <button {...otherProps}>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
