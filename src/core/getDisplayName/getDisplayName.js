function getDisplayName(component) {
  return component.displayName || component.name || 'Component'
}

export default getDisplayName
