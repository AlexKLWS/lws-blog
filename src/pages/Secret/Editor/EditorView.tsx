import React, { useState, useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import get from 'lodash/get'

import './Editor.scss'
import { EditorError } from 'types/editor'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import SubmitModal from 'components/Secret/SubmitModal'
import FileUploadWidget from 'components/FileUploadWidget'
import { Category, ArticleData } from 'types/materials'

interface Props {
  submitData: (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string,
    articleIconWidth: string,
    articleIconHeight: string,
    category: Category,
  ) => void
  performDataCheck: (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string | null,
  ) => void
  submitErrors: EditorError[]
  articleDefaults: ArticleData | null
}

const EditorView: React.FC<Props> = (props: Props) => {
  const [articleName, setArticleName] = useState(get(props.articleDefaults, 'name', ''))
  const [articleSubtitle, setArticleSubtitle] = useState(get(props.articleDefaults, 'subtitle', ''))
  const [articleText, setArticleText] = useState(get(props.articleDefaults, 'articleText', ''))
  const [articleIcon, setArticleIcon] = useState<File | string | null>(get(props.articleDefaults, 'icon.data', null))
  const [articleIconWidth, setArticleIconWidth] = useState(get(props.articleDefaults, 'icon.width', ''))
  const [articleIconHeight, setArticleIconHeight] = useState(get(props.articleDefaults, 'icon.height', ''))
  const [articleCategory, setArticleCategory] = useState(get(props.articleDefaults, 'category', Category.Misc))

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (!props.articleDefaults) {
      return
    }
    setArticleName(get(props.articleDefaults, 'name', ''))
    setArticleSubtitle(get(props.articleDefaults, 'subtitle', ''))
    setArticleText(get(props.articleDefaults, 'articleText', ''))
    setArticleIcon(get(props.articleDefaults, 'icon.data', null))
    setArticleIconWidth(get(props.articleDefaults, 'icon.width', ''))
    setArticleIconHeight(get(props.articleDefaults, 'icon.height', ''))
    setArticleCategory(get(props.articleDefaults, 'category', Category.Misc))
  }, [props.articleDefaults])

  const onSubmit = () => {
    if (!articleIcon) {
      return
    }
    props.submitData(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
      articleCategory,
    )
    setModalIsOpen(false)
  }

  const onSubmitButtonClick = () => {
    props.performDataCheck(articleName, articleSubtitle, articleText, articleIcon)
    setModalIsOpen(true)
  }

  return (
    <div>
      <h1 className='App-title'>Editor</h1>
      <PagePreviewEditorWidget
        name={articleName}
        subtitle={articleSubtitle}
        icon={articleIcon}
        iconWidth={articleIconWidth}
        iconHeight={articleIconHeight}
        category={articleCategory}
        setName={setArticleName}
        setSubtitle={setArticleSubtitle}
        setIcon={setArticleIcon}
        setIconWidth={setArticleIconWidth}
        setIconHeight={setArticleIconHeight}
        setCategory={setArticleCategory}
      />
      <SimpleMDE value={articleText} onChange={setArticleText} />
      <div className='Editor-button-container'>
        <input className='App-button' onClick={onSubmitButtonClick} type={'submit'} value={'Submit'} />
      </div>
      <FileUploadWidget />
      <SubmitModal
        modalIsOpen={modalIsOpen}
        submitErrors={props.submitErrors}
        setModalIsOpen={setModalIsOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default EditorView
