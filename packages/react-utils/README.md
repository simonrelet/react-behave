# @simonrelet/react-utils

> A library of utility functions for React.

## Installation

```sh
yarn add @simonrelet/react-utils
# Or
npm install --save @simonrelet/react-utils
```

<!-- The API documentation will be added here -->
<!-- Run `yarn doc` -->
## Functions

<dl>
<dt><a href="#getDisplayName">getDisplayName(component)</a> ⇒ <code>string</code></dt>
<dd><p>Get the display name of a component.</p>
</dd>
<dt><a href="#getOtherProps">getOtherProps(component, props)</a> ⇒ <code>Object</code></dt>
<dd><p>Extract the props that are not defined in the <code>propTypes</code> of a component.</p>
</dd>
<dt><a href="#renderMethod">renderMethod(methods, props)</a> ⇒ <code>React.Element</code></dt>
<dd><p>Render a component using of the defined methods.</p>
</dd>
<dt><a href="#setRef">setRef(ref, handler)</a></dt>
<dd><p>Provide the reference to the handler depending on the handler&#39;s type.</p>
</dd>
<dt><a href="#toInnerRef">toInnerRef(Component)</a> ⇒ <code>React.Component</code></dt>
<dd><p>Higher order component renaming the prop <code>ref</code> to <code>innerRef</code>.</p>
</dd>
</dl>

<a name="getDisplayName"></a>

## getDisplayName(component) ⇒ <code>string</code>
Get the display name of a component.

**Kind**: global function  
**Returns**: <code>string</code> - The component's name.  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>React.Component</code> | The React component. |

<a name="getOtherProps"></a>

## getOtherProps(component, props) ⇒ <code>Object</code>
Extract the props that are not defined in the `propTypes` of a component.

**Kind**: global function  
**Returns**: <code>Object</code> - The other props.  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>React.Component</code> | The React component. |
| props | <code>Object</code> | The props of the component. |

<a name="renderMethod"></a>

## renderMethod(methods, props) ⇒ <code>React.Element</code>
Render a component using of the defined methods.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| methods | <code>Object</code> | The render methods. |
| methods.children | <code>React.Node</code> | The children of the component. Optional. |
| methods.component | <code>React.Component</code> | A React component. Optional. |
| methods.render | <code>function</code> | A render function. Optional. |
| props | <code>props</code> | The props to pass down. Optional. |

<a name="setRef"></a>

## setRef(ref, handler)
Provide the reference to the handler depending on the handler's type.

**Kind**: global function  
**Throws**:

- <code>Error</code> Will throw an error for unsupported handler types.


| Param | Type | Description |
| --- | --- | --- |
| ref | <code>Object</code> | The reference. |
| handler | <code>function</code> \| <code>Object</code> | The handler. |

<a name="toInnerRef"></a>

## toInnerRef(Component) ⇒ <code>React.Component</code>
Higher order component renaming the prop `ref` to `innerRef`.

**Kind**: global function  
**Returns**: <code>React.Component</code> - The HOC  

| Param | Type | Description |
| --- | --- | --- |
| Component | <code>React.Component</code> | The React component. |

