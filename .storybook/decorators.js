import React from 'react'

export function scrollableDecorator(storyFn) {
  // Hooks cannot be called from a decorator.
  // So we use a React component.
  return <ScrollableContent children={storyFn()} />
}

function ScrollableContent({ style, ...rest }) {
  React.useLayoutEffect(() => {
    const x = (document.body.scrollWidth - window.innerWidth) / 2
    const y = (document.body.scrollHeight - window.innerHeight) / 2
    const timer = setTimeout(() => window.scrollTo(x, y))
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      {...rest}
      style={{
        height: '250vh',
        width: '250vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    />
  )
}
