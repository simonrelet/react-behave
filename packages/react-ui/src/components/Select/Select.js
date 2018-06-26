import { readableColor } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import { Select as SelectBehaviour } from 'react-behave';
import styled from 'styled-components';
import { BaselineCheckIcon, DropDownIcon, SearchIcon } from '../../icons';
import Button from '../Button';

const StyledBaselineCheckIcon = styled(BaselineCheckIcon)`
  margin-right: ${p => p.theme.relativeSpacing()};
  opacity: ${p => (p.visible ? 1 : 0)};
`;

const StyledDropDownIcon = styled(DropDownIcon)`
  transform: rotate(${p => (p.open ? -180 : 0)}deg);
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: ${p => p.theme.palette.text.hint};
  margin-right: ${p => p.theme.relativeSpacing()};
`;

const StyledInput = styled.input`
  background-color: inherit;
  border: 0;
  color: inherit;
  flex: 1;
  font-family: inherit;
  font-size: 1em;
  padding: 0;
  outline: none;

  &::placeholder {
    color: ${p => p.theme.palette.text.hint};
  }
`;

const StyledHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${p => p.theme.palette.divider};
  display: flex;
  flex: none;
  padding: ${p => p.theme.relativeSpacing()};
`;

const StyledEmptyItem = styled.li`
  color: ${p => p.theme.palette.text.secondary};
  font-size: 0.875em;
  padding: ${p => p.theme.relativeSpacing(2)};
  text-align: center;
`;

const itemAttrs = {
  color: p => {
    if (p.isHighlighted) {
      return readableColor(p.theme.palette.primary);
    }
    return p.isValue ? p.theme.palette.primary : 'inherit';
  },

  backgroundcolor: p =>
    p.isHighlighted ? p.theme.palette.primary : 'transparent',

  padding: p => [
    p.theme.relativeSpacing(),
    p.theme.relativeSpacing(2),
    p.theme.relativeSpacing(),
    p.theme.relativeSpacing(),
  ],
};

const StyledItem = styled.li.attrs(itemAttrs)`
  align-items: center;
  color: ${p => p.color};
  cursor: pointer;
  display: flex;
  font-size: 1em;
  flex: none;
  padding: ${p => p.padding.join(' ')};
  background-color: ${p => p.backgroundcolor};
`;

const StyledItems = styled.ul`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  list-style: none;
  margin: 0;
  overflow: auto;
  padding: 0;
`;

const StyledLabel = styled.span`
  opacity: 0.54;
`;

const StyledDropDown = styled.div`
  background-color: ${p => p.theme.palette.paper};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: ${p => p.theme.shadows[5]};
  display: flex;
  flex-direction: column;
  font-size: ${p => (p.dense ? 0.75 : 0.875)}rem;
  margin: ${p => p.theme.relativeSpacing()} 0;
  max-height: 274px;
  overflow: hidden;
  z-index: ${p => p.theme.zIndex.modal};
`;

function Select({
  color,
  dense,
  emptyLabel,
  inputPlaceHolder,
  label,
  nullLabel,
  ...props
}) {
  return (
    <SelectBehaviour
      manualProps
      renderButton={function(value, open, { ref, ...props }) {
        return (
          <Button
            {...props}
            innerRef={ref}
            dense={dense}
            color={color}
            renderIconRight={() => <StyledDropDownIcon open={open} />}
          >
            {label && <StyledLabel>{`${label} `}</StyledLabel>}
            {value ? this.getItemLabel(value) : nullLabel}
          </Button>
        );
      }}
      renderDropDown={({ ref, ...props }) => (
        <StyledDropDown {...props} innerRef={ref} dense={dense} />
      )}
      renderEmpty={() => <StyledEmptyItem>{emptyLabel}</StyledEmptyItem>}
      renderInput={({ key, ref, ...props }) => (
        <StyledHeader key={key}>
          <StyledSearchIcon />
          <StyledInput
            {...props}
            innerRef={ref}
            placeholder={inputPlaceHolder}
          />
        </StyledHeader>
      )}
      renderItem={function(item, value, highlightedItem, { ref, ...props }) {
        const itemValue = this.getItemValue(item);
        const isValue = !!value && itemValue === this.getItemValue(value);
        const isHighlighted =
          !!highlightedItem && itemValue === this.getItemValue(highlightedItem);

        return (
          <StyledItem
            {...props}
            innerRef={ref}
            isValue={isValue}
            isHighlighted={isHighlighted}
          >
            <StyledBaselineCheckIcon visible={isValue} />
            {this.getItemLabel(item)}
          </StyledItem>
        );
      }}
      renderItems={({ ref, ...props }) => (
        <StyledItems {...props} innerRef={ref} />
      )}
      {...props}
    />
  );
}

Select.propTypes = {
  color: PropTypes.string,
  dense: PropTypes.bool,
  emptyLabel: PropTypes.string,
  inputPlaceHolder: PropTypes.string,
  label: PropTypes.string,
  nullLabel: PropTypes.string,
};

Select.defaultProps = {
  dense: false,
  emptyLabel: 'No option.',
  inputPlaceHolder: 'Filter',
  nullLabel: 'Choose an option',
};

export default Select;
