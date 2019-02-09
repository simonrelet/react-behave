export interface Modifier {
  enabled: boolean
  order: number
  fn(data: object): object
}

declare const minWidthModifier: Modifier

export default minWidthModifier
