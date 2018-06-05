import PropTypes from 'prop-types';
import injectStyles from '../injectStyles';

function styles({ palette, typography }) {
  return {
    '@global': {
      '*': {
        boxSizing: 'inherit',
        '&::after,&::before': {
          boxSizing: 'inherit',
        },
      },
      html: {
        boxSizing: 'border-box',
      },
      body: {
        // Escape hatch for the storybook background decorator.
        backgroundColor: ({ inheritBackground }) =>
          inheritBackground ? null : palette.background.app,
        color: palette.text.primary,
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        margin: 0,
      },
    },
  };
}

function AppTheme({ children }) {
  return children;
}

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  inheritBackground: PropTypes.bool,
};

AppTheme.defaultProps = {
  inheritBackground: false,
};

export default injectStyles(styles)(AppTheme);
