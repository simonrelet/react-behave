import { setRef } from '@simonrelet/react-utils';
import PropTypes from 'prop-types';
import { Component } from 'react';

class MergeRefs extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    refs: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    ).isRequired,
  };

  mergeRefs = ref => {
    this.props.refs.forEach((handler, i) => {
      if (handler) {
        setRef(ref, handler);
      }
    });
  };

  render() {
    return this.props.children({ ref: this.mergeRefs });
  }
}

export default MergeRefs;
