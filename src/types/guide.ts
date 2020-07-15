export enum PinType {
  MISC,
  BAR,
  RESTAURANT,
  CAFE,
}

export type GuidePinData = {
  type: PinType
  lat: number
  lng: number
}
