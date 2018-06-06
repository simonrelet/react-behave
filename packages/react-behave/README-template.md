# ${NAME}

> ${DESCRIPTION}

## ...Of what?

...Of behavioral components.

The components of this library will only contain behaviour and not UI specific elements.
If you are familiar with the [Presentational/Container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) concept, one can say this library only provides containers.

This means:

- You can use any other component library for the UI like [Material UI](https://material-ui.com/), [React Bootstrap](https://react-bootstrap.github.io/), [Blueprint](http://blueprintjs.com/), [Element React](https://eleme.github.io/element-react/#/en-US/quick-start), etc.
- Or write your own from scratch.
- You can use CSS-in-JS, CSS modules or basic CSS.
- There is no `<Button />` component.

## Installation

### npm

```sh
npm install --save ${NAME}
```

### yarn

```sh
yarn add ${NAME}
```

### UMD

- Development: https://unpkg.com/${NAME}@${VERSION}/build/umd/react-behave.development.js
- Production: https://unpkg.com/${NAME}@${VERSION} or https://unpkg.com/${NAME}@${VERSION}/build/umd/react-behave.production.min.js

## Documentaion

The documentation of each component can be found [here](https://github.com/simonrelet/react-libraries/tree/react-behave-${VERSION}/packages/react-behave/docs).

---

_This project was inspired by [react-autocomplete](https://github.com/reactjs/react-autocomplete)._
