import { GuideLocationInfo, LocationCoords } from './guide'

export type ArticleData = {
  articleText: string
} & Material

export type PageData = {
  pageURL: string
} & Material

export type GuideData = {
  locations: GuideLocationInfo[]
  defaultZoom: number
  defaultCenter: LocationCoords
} & Material

export type PreviewMaterial = {
  createdAt: string
  pageURL?: string
} & Material

export type Material = {
  referenceId?: string
  createdAt?: string
  name: string
  subtitle: string
  icon: IconData
  category: Category
}

export type IconData = {
  data: string
  height: string | null
  width: string | null
}

export enum Category {
  Misc,
  Life,
  Code,
  Guides,
  Projects,
}
