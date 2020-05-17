export interface ArticleData extends Material {
  articleText: string
}

export interface PageData extends Material {
  pageURL: string
}

export interface PreviewMaterial extends Material {
  createdAt: string
  pageURL?: string
}

export interface Material {
  referenceId?: string
  name: string
  subtitle: string
  icon: IconData
  category: Category
}

export interface IconData {
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
