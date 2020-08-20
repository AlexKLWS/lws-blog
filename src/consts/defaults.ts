import { ArticleData, Category, PageData, GuideData } from 'types/materials'

export const DEFAULT_ARTICLE_DATA: ArticleData = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  articleText: '',
}

export const DEFAULT_PAGE_DATA: PageData = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  pageURL: '',
}

export const DEFAULT_GUIDE_DATA: GuideData = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  defaultCenter: { lat: 0.0, lng: 0.0 },
  defaultZoom: 0,
  locations: [],
}
