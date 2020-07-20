export enum PinType {
  MISC,
  BAR,
  RESTAURANT,
  CAFE,
}

export type GuideLocationInfo = {
  type: PinType
  lat: number
  lng: number
  title: string
  description: string
  imageUrl: string
}
