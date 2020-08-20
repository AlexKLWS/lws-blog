import { MaterialDataObjectVerifier, VerifiedPropertyType } from 'types/verifier'
import pageEditorErrors from './pageEditorErrors'
import editorErrors from './editorErrors'

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

export const PAGE_DATA_VERIFIER: MaterialDataObjectVerifier = {
  name: { error: pageEditorErrors.noPageName, type: VerifiedPropertyType.PRIMITIVE },
  subtitle: { error: pageEditorErrors.noPageSubtitle, type: VerifiedPropertyType.PRIMITIVE },
  icon: {
    error: pageEditorErrors.noPageIcon,
    type: VerifiedPropertyType.OBJECT,
    innerObject: { data: { error: pageEditorErrors.noPageIcon, type: VerifiedPropertyType.PRIMITIVE } },
  },
  pageURL: { error: pageEditorErrors.noPageURL, type: VerifiedPropertyType.PRIMITIVE },
}
