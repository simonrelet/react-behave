import { renderMethod } from '@simonrelet/react-utils';
import PropTypes from 'prop-types';
import React from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import ClickOutside from '../ClickOutside';
import MergeRefs from '../MergeRefs';

const minWidthModifier = {
  enabled: true,
  fn(data) {
    const referenceWidth = Math.floor(data.offsets.reference.width);
    const dropDownWidth = Math.floor(data.offsets.popper.width);

    if (dropDownWidth < referenceWidth) {
      const minWidth = referenceWidth;
      data.styles.minWidth = `${minWidth}px`;
    }

    return data;
  },
  // Just after the `computeStyle` modifier (850)
  // https://popper.js.org/popper-documentation.html#modifiers..computeStyle
  order: 851,
};

function DropDown({ children, component, onClickOutside, open, render }) {
  return (
    <Manager>
      <Reference>{({ ref }) => children({ ref })}</Reference>
      {open && (
        <Popper placement="bottom-start" modifiers={{ minWidthModifier }}>
          {({ ref: popperRef, ...popperProps }) => (
            <ClickOutside
              onClickOutside={onClickOutside}
              render={({ ref: clickOutsideRef }) => (
                <MergeRefs refs={[clickOutsideRef, popperRef]}>
                  {({ ref }) =>
                    renderMethod({ render, component }, { ref, ...popperProps })
                  }
                </MergeRefs>
              )}
            />
          )}
        </Popper>
      )}
    </Manager>
  );
}

DropDown.propTypes = {
  children: PropTypes.func.isRequired,
  component: PropTypes.object,
  onClickOutside: PropTypes.func.isRequired,
  open: PropTypes.bool,
  render: PropTypes.func,
};

DropDown.defaultProps = {
  open: false,
};

export default DropDown;
