export interface ArticleData extends PagePreview {
  articleText: string
}

export interface PagePreview {
  id?: string
  name: string
  subtitle: string
  icon: IconData
}

export interface IconData {
  data: string
  height: string | null
  width: string | null
}
