# ${name}

> ${description}

## Installation

### npm

```sh
npm install --save-dev ${name}
```

### yarn

```sh
yarn add ${name} -D
```

## Using environments variables

Some whitelisted environments variables can be used in the code of the library.
They will be replaced and statically evaluated at compile time.
Be sure to use the leading `process.env.` or it will not work.

Available variables:

- `process.env.NODE_END`: Either `'production'`, `'development'` or `'test'`.
- `process.env.REACT_LIB_*`: Any variable starting with `REACT_LIB_`.

Example:

```js
const API_URL = process.env.REACT_LIB_API_URL;

if (process.env.NODE_ENV === 'development' && !/^https/.test(API_URL)) {
  console.warn(`The API_URL is not secured: ${API_URL}`);
}

console.log('API_URL:', API_URL);
```

```js
// NODE_ENV=development
// REACT_LIB_API_URL=http://hello.com
var API_URL = 'http://hello.com/';

if (!/^https/.test(API_URL)) {
  console.warn('The API_URL is not secured: '.concat(API_URL));
}

console.log('API_URL:', API_URL);
```

```js
// NODE_ENV=production
// REACT_LIB_API_URL=http://hello.com
var API_URL = 'http://hello.com/';

console.log('API_URL:', API_URL);
```

## Scripts

### `build`

_Usage_:

```sh
react-libraries build [-w|--watch]
```

Build the library JavaScript in CommonJS, ES2015 modules and UMD bundles, and the SASS in CSS.

This script accepts the `--watch` (or `-w`) option in which case it will watch for changes and rebuild the bundles.

#### JavaScript

The file _src/index.js_ is required for this command to work, and the output files are defined in _package.json_:

- CommonJS: Defined by the entry `pkg.main` (ex: `"main": "build/my-lib.js"`).
- ES2015 modules: Defined by the entry `pkg.module` (ex: `"module": "build/my-lib.es.js"`).
- UMD production: Defined by the entry `pkg.unpkg` (ex: `"unpkg": "build/umd/my-lib.production.min.js"`).
- UMD development: Defined by the entry `pkg.unpkg-dev` (ex: `"unpkg-dev": "build/umd/my-lib.development.js"`).

For UMD bundles, the exported global variable name is the name in `pkg.name` without the npm scope (if any) in PascalCase.
For example, the package name `@company/my-lib` gives `MyLib`.

If an entry is not defined, the corresponding bundle will be skipped.

#### SASS

The file _src/index.scss_ can be transform to CSS if an output file is defined in the _package.json_ by the entry `pkg.style` (ex: `"style": "build/my-lib.css"`).

If the entry is not defined, the styles bundle will be skipped.

### `bump-version`

_Usage_:

```sh
react-libraries bump-version <new-verison>
```

Update the following files with the new version:

- _package.json_: The `version` field is updated.
- _CHANGELOG.md_ (if it exists): The "Unreleased" section is renamed to "\<new-version> (date)".
- _README.md_ (if _README-template.md_ exists): See the [`doc` script](#doc).

### `clean`

Remove the folowing generated folders:

- _build/_
- _build-storybook/_
- _coverage/_

### `doc`

Generate the _README.md_ and the documentation.

#### README-template.md

The _README.md_ file can be generated from the _README-template.md_ allowing you to inject values from your _package.json_.
You can use the syntax `$${path}` where `path` is any valid object path in _package.json_.

Example:

_package.json_

```json
{
  "name": "my-lib",
  "description": "Library of things.",
  "version": "1.0.0",
  "unpkg": "build/umd/my-lib.production.min.js",
  "unpkg-dev": "build/umd/my-lib.development.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/me/my-lib"
  }
}
```

_README-template.md_

````md
# $${name}

> $${description}

## Installation

### npm

```sh
npm install --save $${name}
```

### yarn

```sh
yarn add $${name}
```

### UMD

- Production: https://unpkg.com/$${name}@$${version} or https://unpkg.com/$${name}@$${version}/$${unpkg}
- Development: https://unpkg.com/$${name}@$${version}/$${unpkg-dev}

## Documentaion

The documentation can be found [here]($${repository.url}/tree/$${version}/docs).
````

_README.md_

````md
# my-lib

> Library of things.

## Installation

### npm

```sh
npm install --save my-lib
```

### yarn

```sh
yarn add my-lib
```

### UMD

- Production: https://unpkg.com/my-lib@1.0.0 or https://unpkg.com/my-lib@1.0.0/build/umd/my-lib.production.min.js
- Development: https://unpkg.com/my-lib@1.0.0/build/umd/my-lib.development.js

## Documentaion

The documentation can be found [here](https://github.com/me/my-lib/tree/1.0.0/docs).
````

#### Documentation

The JSDoc in the JavaScript files under the _src/_ folder will be parsed and rendered in a corresponding markdown file under the _docs/_ folder.
Are excluded the indexes files (_index.js_), test files (_\*.test.js_) and storybook's stories (_\*.stories.js_).

2 parsers are used:

- [react-docgen](https://github.com/reactjs/react-docgen) for React components.
- [jsdoc-api](https://github.com/jsdoc2md/jsdoc-api) for all other JavaScript files.