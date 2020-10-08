import { Article, Category, ExtMaterial, Guide } from 'types/materials'

export const DEFAULT_ARTICLE_DATA: Article = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  articleText: '',
}

export const DEFAULT_EXT_MATERIAL_DATA: ExtMaterial = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  url: '',
}

export const DEFAULT_GUIDE_DATA: Guide = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  defaultCenter: { lat: 0.0, lng: 0.0 },
  defaultZoom: 0,
  locations: [],
}
