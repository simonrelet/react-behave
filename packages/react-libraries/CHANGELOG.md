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

## 0.17.0 (November 9, 2018)

### Breaking changes

- The injected values in the _README.md_ now uses the mustache syntax `{{path}}` to avoid conflict with the Markdown math syntax.

## 0.16.0 (November 7, 2018)

### Breaking changes

- Build using babel instead of rollup to allow tree shaking.
- Removed UMD support.
- SASS files are no longer transformed.

## 0.15.0 (October 11, 2018)

### Breaking changes

- Remove size-snapshot plugin.

### Enhancements

- Add a external module configuration.

## 0.14.0 (September 21, 2018)

### Enhancements

- Add `test` scripts.

## 0.13.1 (September 13, 2018)

### Bug fixes

- Fix dependency versions ranges.

## 0.13.0 (September 12, 2018)

### Enhancements

- Support CSS modules imports.

## 0.12.1 (September 10, 2018)

### Documentation

- Fixed typo in README.

## 0.12.0 (July 25, 2018)

### Enhancements

- The `doc` script formats `PropTypes.shape` type to `Object`.

## 0.11.0 (July 20, 2018)

## Enhancements

- Support SVG to React component.

## 0.10.0 (July 17, 2018)

### Enhancements

- The `doc` script warns about props defined in `defaultProps` but not in `propTypes`.

## 0.9.0 (July 16, 2018)

### Enhancements

- Skip the doc generation for undocumented components.

## 0.8.0 (July 16, 2018)

### Bug fixes

- The `doc` script doesn't fail when there are no props.

## 0.7.0 (July 16, 2018)

### Enhancements

- Don't override files that were not generated in `doc` and `bump-version` scripts.

### Bug fixes

- JavaScript build now display the error message.

## 0.6.0 (July 11, 2018)

### Breaking changes

- Don't replace `process.env.NODE_END` in CommonJS and ES modules bundles.

## 0.5.0 (July 10, 2018)

### Enhancements

- Allow to change default README template path with the `-r` option for the `doc` and `bump-version` scripts.

## 0.4.0 (July 7, 2018)

### Documentation

- Fix URL to latest release in _README.md_.

## 0.3.0 (July 7, 2018)

### Bug fixes

- `build` script doesn't crash any more when _.size-snapshot.json_ is missing.

## 0.2.0 (July 5, 2018)

### Enhancements

- Build SASS using [node-sass](https://github.com/sass/node-sass).

## 0.1.0 (June 26, 2018)

### Enhancements

- Build libraries using [rollup.js](https://rollupjs.org/).
- Build documentation using [react-docgen](https://github.com/reactjs/react-docgen).
- Clean generated folders.
