import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
// Side effect import as the Button component apply CSS classes on the SVGIcon
import '../../icons/SVGIcon';
import injectStyles from '../../core/injectStyles';

export const severities = ['normal', 'primary', 'success', 'warning', 'danger'];

function createSeverityStyle(color, palette) {
  const emphasizeColor = palette.emphasize(color, 0.07);
  const focusBoxShadow =
    color === palette.white
      ? palette.fade(palette.primary, 0.5)
      : palette.fade(color, 0.5);

  return {
    backgroundColor: color,
    color: palette.getTextColorForBackground(
      color,
      palette.text.primary,
      palette.textContrast.primary,
    ),

    '&:focus': {
      boxShadow: `0 0 0 0.2rem ${focusBoxShadow}`,
    },

    '&:hover': {
      backgroundColor: emphasizeColor,
    },
  };
}

function styles({ borderRadius, palette, relativeSpacing }) {
  return {
    root: {
      alignItems: 'center',
      border: {
        width: 1,
        style: 'solid',
        color: 'transparent',
      },
      borderRadius,
      cursor: 'pointer',
      display: 'inline-flex',
      fontFamily: 'inherit',
      fontSize: '1rem',
      outline: 'none',
      padding: [relativeSpacing(), relativeSpacing(2)],
      transition: 'all 120ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },

    severitynormal: {
      ...createSeverityStyle(palette.white, palette),
      // borderColor: palette.grey,
    },

    severityprimary: createSeverityStyle(palette.primary, palette),
    severitysuccess: createSeverityStyle(palette.success, palette),
    severitywarning: createSeverityStyle(palette.warning, palette),
    severitydanger: createSeverityStyle(palette.error, palette),

    withIconLeft: {
      paddingLeft: relativeSpacing(),
    },

    withIconRight: {
      paddingRight: relativeSpacing(),
    },

    dense: {
      fontSize: '0.875rem',
    },

    content: {
      flex: 'none',
    },

    contentWithLeftIcon: {
      marginLeft: relativeSpacing(),
    },
    contentWithRightIcon: {
      marginRight: relativeSpacing(),
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
  severity,
  ...otherProps
}) {
  const iconLeft = renderIconLeft();
  const iconRight = renderIconRight();

  return (
    <button
      {...otherProps}
      className={classNames(classes.root, classes[`severity${severity}`], {
        [classes.withIconLeft]: !!iconLeft,
        [classes.withIconRight]: !!iconRight,
        [classes.dense]: dense,
      })}
      ref={innerRef}
    >
      {iconLeft}
      <span
        className={classNames(classes.content, {
          [classes.contentWithLeftIcon]: !!iconLeft,
          [classes.contentWithRightIcon]: !!iconRight,
        })}
      >
        {children}
      </span>
      {iconRight}
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
  severity: PropTypes.oneOf(severities),
};

Button.defaultProps = {
  dense: false,
  renderIconLeft: () => null,
  renderIconRight: () => null,
  severity: severities[0],
};

export default injectStyles(styles)(Button);
