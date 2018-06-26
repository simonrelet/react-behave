import PropTypes from 'prop-types';
import injectStyles from '../../core/injectStyles';

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
        backgroundColor: palette.background.app,
        color: palette.text.primary,
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        margin: 0,
      },
    },
  };
}

function GlobalTheme({ children }) {
  return children;
}

GlobalTheme.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectStyles(styles)(GlobalTheme);
