import PropTypes from 'prop-types'
import React from 'react'
import { setRefs } from '../../core/setRefs'

export class MergeRefs extends React.Component {
  mergeRefs = ref => {
    setRefs(ref, this.props.refs)
  }

  render() {
    return this.props.children({ ref: this.mergeRefs })
  }
}

MergeRefs.propTypes = {
  children: PropTypes.func.isRequired,
  refs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
}
