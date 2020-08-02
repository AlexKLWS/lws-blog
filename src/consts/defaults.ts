import { ArticleData, Category, PageData } from 'types/materials'

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
