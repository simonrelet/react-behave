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
