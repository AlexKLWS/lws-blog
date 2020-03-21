import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import Modal from 'react-modal'
import 'easymde/dist/easymde.min.css'

import './Editor.scss'
import { EditorError } from 'types/editor'
import ArticleSubmitModal from './Components/ArticleSubmitModal'

interface Props {
  submitData: (articleName: string, articleSubtitle: string, articleText: string) => void
  performDataCheck: (articleName: string, articleSubtitle: string, articleText: string) => void
  submitErrors: EditorError[]
}

const EditorView: React.FC<Props> = (props: Props) => {
  const [articleName, setArticleName] = useState('')
  const [articleSubtitle, setArticleSubtitle] = useState('')
  const [articleText, setArticleText] = useState('')

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onNameInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleName(event.target.value)
  }

  const onSubtitleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleSubtitle(event.target.value)
  }

  const onSubmit = () => {}

  const onSubmitButtonClick = () => {
    props.performDataCheck(articleName, articleSubtitle, articleText)
    setModalIsOpen(true)
  }

  return (
    <div>
      <h1 className='Editor-title'>Editor</h1>
      <div className='Editor-input-container'>
        <input className='App-input' placeholder='Title' value={articleName} onChange={onNameInputValueChange} />
        <input
          className='App-input'
          placeholder='Subtitle'
          value={articleSubtitle}
          onChange={onSubtitleInputValueChange}
        />
      </div>
      <SimpleMDE value={articleText} onChange={setArticleText} />
      <div className='Editor-button-container'>
        <input className='App-button' onClick={onSubmitButtonClick} type={'submit'} value={'Submit'} />
      </div>
      <ArticleSubmitModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} submitErrors={props.submitErrors} />
    </div>
  )
}

export default EditorView
