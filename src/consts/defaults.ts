import { ArticleData, Category, PageData } from 'types/materials'
import { MaterialDataObjectVerifier, VerifiedPropertyType } from 'types/verifier'
import editorErrors from './editorErrors'

export const DEFAULT_ARTICLE_DATA: ArticleData = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  articleText: '',
}

export const ARTICLE_DATA_VERIFIER: MaterialDataObjectVerifier = {
  name: { error: editorErrors.noArticleName, type: VerifiedPropertyType.PRIMITIVE },
  subtitle: { error: editorErrors.noArticleSubtitle, type: VerifiedPropertyType.PRIMITIVE },
  icon: {
    error: editorErrors.noArticleIcon,
    type: VerifiedPropertyType.OBJECT,
    innerObject: { data: { error: editorErrors.noArticleIcon, type: VerifiedPropertyType.PRIMITIVE } },
  },
  articleText: { error: editorErrors.noArticleText, type: VerifiedPropertyType.PRIMITIVE },
}

export const DEFAULT_PAGE_DATA: PageData = {
  name: '',
  subtitle: '',
  icon: { data: '', height: null, width: null },
  category: Category.Misc,
  pageURL: '',
}
