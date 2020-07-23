export enum PinType {
  MISC,
  BAR,
  RESTAURANT,
  CAFE,
}

export type GuideLocationInfo = {
  type: PinType
  coordinates: LocationCoords
  address: string
  title: string
  description: string
  imageUrl: string
}

export type LocationCoords = {
  lat: number
  lng: number
}
