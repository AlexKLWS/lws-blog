export enum PinType {
  MISC,
  BAR,
  RESTAURANT,
  CAFE,
}

export type GuideItemData = {
  type: PinType
  lat: number
  lng: number
  title: string
  description: string
}
