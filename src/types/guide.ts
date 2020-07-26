export enum LocationType {
  MISC,
  BAR,
  RESTAURANT,
  CAFE,
}

export type GuideLocationInfo = {
  type: LocationType
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
