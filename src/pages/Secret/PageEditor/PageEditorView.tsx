import React, { useState } from 'react'

import './PageEditor.scss'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import { EditorError } from 'types/editor'
import SubmitModal from 'components/Secret/SubmitModal'
import { Category } from 'types/materials'

interface Props {
  submitData: (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
  ) => void
  performDataCheck: (pageName: string, pageSubtitle: string, pageIcon: File | null, pageURL: string) => void
  submitErrors: EditorError[]
}

const PageEditorView = (props: Props) => {
  const [pageName, setPageName] = useState('')
  const [pageSubtitle, setPageSubtitle] = useState('')
  const [pageURL, setPageURL] = useState('')
  const [pageIcon, setPageIcon] = useState<File | null>(null)
  const [pageIconWidth, setPageIconWidth] = useState('')
  const [pageIconHeight, setPageIconHeight] = useState('')
  const [pageCategory, setPageCategory] = useState(Category.Misc)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onSubmit = () => {
    if (!pageIcon) {
      return
    }
    props.submitData(pageName, pageSubtitle, pageIcon, pageIconWidth, pageIconHeight, pageCategory, pageURL)
    setModalIsOpen(false)
  }

  const onSubmitButtonClick = () => {
    props.performDataCheck(pageName, pageSubtitle, pageIcon, pageURL)
    setModalIsOpen(true)
  }

  const onURLInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageURL(event.target.value)
  }

  return (
    <div>
      <h1 className='App-title'>Page Editor</h1>
      <PagePreviewEditorWidget
        name={pageName}
        subtitle={pageSubtitle}
        icon={pageIcon}
        iconWidth={pageIconWidth}
        iconHeight={pageIconHeight}
        category={pageCategory}
        setName={setPageName}
        setSubtitle={setPageSubtitle}
        setIcon={setPageIcon}
        setIconWidth={setPageIconWidth}
        setIconHeight={setPageIconHeight}
        setCategory={setPageCategory}
      />
      <div className='PE-URL-container'>
        <input placeholder='URL' className='App-input' onChange={onURLInputValueChange} />
      </div>
      <div className='PE-button-container'>
        <input className='App-button' onClick={onSubmitButtonClick} type={'submit'} value={'Submit'} />
      </div>
      <SubmitModal
        modalIsOpen={modalIsOpen}
        submitErrors={props.submitErrors}
        setModalIsOpen={setModalIsOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default PageEditorView
