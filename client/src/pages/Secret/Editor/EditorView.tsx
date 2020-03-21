import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import Modal from 'react-modal'
import 'easymde/dist/easymde.min.css'

import './Editor.scss'
import ArticleSubmitModal from './Components/ArticleSubmitModal'

interface Props {}

const EditorView: React.FC<Props> = (props: Props) => {
  const [currentValue, setCurrentValue] = useState('')

  const [articleName, setArticleName] = useState('')
  const [articleSubtitle, setArticleSubtitle] = useState('')

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onNameInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleName(event.target.value)
  }

  const onSubtitleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleSubtitle(event.target.value)
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
      <SimpleMDE value={currentValue} onChange={setCurrentValue} />
      <div className='Editor-button-container'>
        <input
          className='App-button'
          onClick={() => {
            setModalIsOpen(true)
          }}
          type={'submit'}
          value={'Submit'}
        />
      </div>
      <ArticleSubmitModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </div>
  )
}

export default EditorView
