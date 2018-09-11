<!--
  When editing this file keep in mind to:
  * Prefer clear English sentences to short abbreviations.
  * Keep the sections sorted in the same order:
    1. Breaking changes
    2. Enhancements
    3. Bug fixes
    4. Documentation
  * Put all unreleased changes in the top level "Unreleased" section.
-->

# Changelog

All notable changes to this project will be documented here.

This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.6.0 (September 11, 2018)

### Breaking changes

- `Dropdown` no longer passes `open` to `props.renderDropdown`.

### Enhancements

- Added `Popper`, `PopperManager` and `PopperReference` components.

## 0.5.0 (September 10, 2018)

### Breaking changes

- `props.renderDropDown` has been renamed to `props.renderDropdown` for components `Dropdown` and `Select`.

### Enhancements

- Added `Dropdown.props.modifiers`.

### Documentation

- Remove all semicolons from examples.
- Fixed typo in README.

## 0.4.0 (July 17, 2018)

### Breaking changes

- Replace `ResizeObserver` component by `watchResize` function.

## 0.4.0-alpha.2 (July 16, 2018)

### Bug fixes

- Export `ResizeObserver` component.

## 0.4.0-alpha.1 (July 16, 2018)

### Breaking changes

- `props.render` has been renamed to `props.children` for components `ClickOutside`, `Dropdown` and `MergeRefs`.
- Remove `renderMethod`.
- the prop `Responsive.render` has been merged in `Responsive.children`.

### Enhancements

- Create `ResizeObserver` component.
- `Responsive` support local responsivity.

## 0.3.0 (July 5, 2018)

### Breaking changes

- `Select`'s render functions `props.renderButton` and `props.renderItem` now take a context as first parameter.

### Enhancements

- `Select` support multiple values.
- `props.matchItem` in `Select` component now takes a context as last parameter.

## 0.2.0 (June 26, 2018)

### Breaking changes

- Renamed `DropDown` to `Dropdown`.

### Enhancements

- Create `Select` component.
- The prop `Responsive.screenSizes` is now optional.
- Add `Dropdown.placement`.
- `toInnerRef` doesn't passes the `innerRef` if `ref` is falsy.

### Documentation

- Update documentation of `Responsive`, `ClickOutside`, `Dropdown`, `MergeRefs`.

## 0.1.0 (June 6, 2018)

### Enhancements

- Create `ClickOutside` component.
- Create `DropDown` component.
- Create `MergeRefs` component.
- Create `Responsive` component.
- Create `getDisplayName` function.
- Create `getOtherProps` function.
- Create `renderMethods` function.
- Create `setRef` function.
- Create `toInnerRef` function.
