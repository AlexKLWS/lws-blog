import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import './Editor.scss'
import { EditorError } from 'types/editor'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import SubmitModal from 'components/Secret/SubmitModal'
import FileUploadWidget from 'components/FileUploadWidget'
import { Category } from 'types/materials'

interface Props {
  submitData: (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
    category: Category,
  ) => void
  performDataCheck: (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | null,
  ) => void
  submitErrors: EditorError[]
}

const EditorView: React.FC<Props> = (props: Props) => {
  const [articleName, setArticleName] = useState('')
  const [articleSubtitle, setArticleSubtitle] = useState('')
  const [articleText, setArticleText] = useState('')
  const [articleIcon, setArticleIcon] = useState<File | null>(null)
  const [articleIconWidth, setArticleIconWidth] = useState('')
  const [articleIconHeight, setArticleIconHeight] = useState('')
  const [articleCategory, setArticleCategory] = useState(Category.Misc)

  const [modalIsOpen, setModalIsOpen] = useState(false)

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
      <h1 className='Editor-title'>Editor</h1>
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
