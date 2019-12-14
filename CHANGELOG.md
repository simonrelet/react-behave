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

## 1.1.1 (December 14, 2019)

### Bug fixes

- `useAsyncCallback` no longer re-throw the error, it can still be catched from
  within the callback:

```js
useAsyncCallback(async () => {
  try {
    return await asyncFunction()
  } catch (error) {
    // Do something with the error.

    // Re-throw it to let `useAsyncCallback` update its state.
    throw error
  }
}, [])
```

## 1.1.0 (October 10, 2019)

### Enhancements

- The default value of the `resizeInterval` option of `watchResize` is now 16ms (was 166ms).

## 1.0.0 (October 8, 2019)

### Breaking changes

- `usePopper` now takes Ref objects as parameter in combination with a
  `disabled` option instead of HTML elements to avoid extra updates due to
  setState calls:

```diff
- const [reference, setReference] = React.useState(null)
- const [popper, setPopper] = React.useState(null)
+ const reference = React.useRef(null)
+ const popper = React.useRef(null)
  const [opened, setOpened] = React.useState(false)

  const { style } = usePopper(reference, popper, {
+   disabled: !opened,
  })
```

- `composeRefs` now returns an object that behaves like a Ref object.
- `minWidthModifier` has been removed as the same behaviour can easily be
  achieved with inline styles:

```jsx
function MinWidthPopper() {
  const referenceRef = React.useRef(null)
  const popperRef = React.useRef(null)

  React.useEffect(() => {
    const referenceRect = referenceRef.current.getBoundingClientRect()
    popperRef.current.style.minWidth = `${referenceRect.width}px`
  })

  const { style } = usePopper(referenceRef, popperRef, { placement: 'bottom' })

  return (
    <div>
      <span ref={referenceRef} />
      <span ref={popperRef} style={style} />
    </div>
  )
}
```

### Documentation

- Fix the overflow in the `watchResize` and `getScreenSize` stories.

## 1.0.0-rc.4 (August 20, 2019)

### Bug fixes

- Cancel pending callback after unmounting a component in `useAsyncCallback`.

## 1.0.0-rc.3 (August 20, 2019)

### Bug fixes

- Add missing export of `useAsyncCallback`, `useAsyncMemo` and `usePopper`.

## 1.0.0-rc.2 (August 14, 2019)

### Bug fixes

- Fix import in `composeHandlers`.

## 1.0.0-rc.1 (August 10, 2019)

### Breaking changes

- The `getDisplayName` function has been removed.
- The `ClickOutside` component has been removed.
- The `MergeRefs` component has been removed.
- The `Responsive` component has been removed.
- The `FocusTrap` component has been removed.

### Enhancements

- Add `usePopper` hook.
- Add `useAsyncMemo` hook.
- Add `useAsyncCallback` hook.

### Bug fixes

- The typings are no longer duplicated in CommonJS and ES modules folders.

### Documentation

- The documentation has been rewritten.

## 1.0.0-alpha.8 (July 10, 2019)

### Enhancements

- Create `composeRefs` function.
- The callback parameter of `watchResize` is now given the full [`DOMRect`](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) object.

### Bug fixes

- The callback parameter of `watchResize` is no longer called once the watcher has been stopped.

## 1.0.0-alpha.7 (March 26, 2019)

### Bug fixes

- Update `FocusTrap` typings.

## 1.0.0-alpha.6 (March 25, 2019)

### Enhancements

- Add the possibility to deactivate the `FocusTrap`.

## 1.0.0-alpha.5 (February 10, 2019)

### Enhancements

- Add TypeScript type definitions.

## 1.0.0-alpha.4 (February 4, 2019)

### Enhancements

- Create `callHandlers` function.
- Create `composeHandlers` function.

## 1.0.0-alpha.3 (February 4, 2019)

### Bug fixes

- The `fallbackRef` props is now taken into account in `FocusTrap`.

## 1.0.0-alpha.2 (February 4, 2019)

### Bug fixes

- The `fallbackRef` props is now taken into account in `FocusTrap`.

## 1.0.0-alpha.1 (February 4, 2019)

### Breaking changes

- Remove `getOtherProps`.
- Remove `Dropdown` and `Popper` and export `minWidthModifier` instead.
- The parameter of the `children` props for `ClickOutside`, `MergeRefs` are now an object containing the `ref` property.

### Enhancements

- Create `FocusTrap` component.
- Create `setRefs` function to support both functions and objects refs.
- Add `onEscape` prop to the `ClickOutside` component.

### Enhancements

- Create a `minWidthModifier` [PopperJS](https://popper.js.org) modifier.

## 0.7.1 (November 7, 2018)

### Bug fixes

- Remove import of `toInnerRef`.

## 0.7.0 (November 7, 2018)

### Breaking changes

- Removed `Select` and `toInnerRef`.

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
