import { toInnerRef } from '@simonrelet/react-utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
// Side effect import as the Button component apply CSS classes on the SVGIcon
import '../icons/SVGIcon';
import injectStyles from '../injectStyles';

function styles({ borderRadius, palette, relativeSpacing }) {
  return {
    root: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: {
        width: 1,
        style: 'solid',
        color: palette.grey,
      },
      borderRadius,
      cursor: 'pointer',
      display: 'inline-flex',
      fontFamily: 'inherit',
      fontSize: '1rem',
      outline: 'none',
      padding: ({ renderIconLeft, renderIconRight }) => {
        return [
          relativeSpacing(),
          relativeSpacing(renderIconRight ? 1 : 2),
          relativeSpacing(),
          relativeSpacing(renderIconLeft ? 1 : 2),
        ].join(' ');
      },
      transition: 'all 120ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

      '&:focus': {
        borderColor: palette.primary,
        color: palette.primary,
      },

      '&:hover:not(:focus)': {
        borderColor: palette.emphasize(palette.grey),
      },
    },
    dense: {
      fontSize: '0.875rem',
    },
    content: {
      flex: 'none',
    },
    icon: {
      flex: 'none',
      transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    iconLeft: {
      composes: '$icon',
      marginRight: relativeSpacing(),
    },
    iconRight: {
      composes: '$icon',
      marginLeft: relativeSpacing(),
    },
  };
}

function Button({
  children,
  classes,
  dense,
  innerRef,
  renderIconLeft,
  renderIconRight,
  ...otherProps
}) {
  return (
    <button
      {...otherProps}
      className={classNames(classes.root, { [classes.dense]: dense })}
      ref={innerRef}
    >
      {renderIconLeft && renderIconLeft({ className: classes.iconLeft })}
      <span className={classes.content}>{children}</span>
      {renderIconRight && renderIconRight({ className: classes.iconRight })}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dense: PropTypes.bool,
  innerRef: PropTypes.any,
  renderIconLeft: PropTypes.func,
  renderIconRight: PropTypes.func,
};

Button.defaultProps = {
  dense: false,
};

export default injectStyles(styles)(toInnerRef(Button));
