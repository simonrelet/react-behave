export interface Modifier {
  enabled: boolean
  order: number
  fn(data: object): object
}

export declare const minWidthModifier: Modifier
