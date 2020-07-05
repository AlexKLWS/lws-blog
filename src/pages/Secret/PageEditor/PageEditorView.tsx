import React, { useState, useEffect } from 'react'
import get from 'lodash/get'

import './PageEditor.scss'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import { EditorError } from 'types/editor'
import SubmitModal from 'components/Secret/SubmitModal'
import { Category, PageData } from 'types/materials'

interface Props {
  submitData: (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File | string,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
  ) => void
  performDataCheck: (pageName: string, pageSubtitle: string, pageIcon: File | string | null, pageURL: string) => void
  submitErrors: EditorError[]
  pageDefaults: PageData | null
}

const PageEditorView = (props: Props) => {
  const [pageName, setPageName] = useState(get(props.pageDefaults, 'name', ''))
  const [pageSubtitle, setPageSubtitle] = useState(get(props.pageDefaults, 'subtitle', ''))
  const [pageURL, setPageURL] = useState(get(props.pageDefaults, 'pageURL', ''))
  const [pageIcon, setPageIcon] = useState<File | string | null>(get(props.pageDefaults, 'icon.data', null))
  const [pageIconWidth, setPageIconWidth] = useState(get(props.pageDefaults, 'icon.width', ''))
  const [pageIconHeight, setPageIconHeight] = useState(get(props.pageDefaults, 'icon.height', ''))
  const [pageCategory, setPageCategory] = useState(get(props.pageDefaults, 'category', Category.Misc))

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (!props.pageDefaults) {
      return
    }
    setPageName(get(props.pageDefaults, 'name', ''))
    setPageSubtitle(get(props.pageDefaults, 'subtitle', ''))
    setPageURL(get(props.pageDefaults, 'pageURL', ''))
    setPageIcon(get(props.pageDefaults, 'icon.data', null))
    setPageIconWidth(get(props.pageDefaults, 'icon.width', ''))
    setPageIconHeight(get(props.pageDefaults, 'icon.height', ''))
    setPageCategory(get(props.pageDefaults, 'category', Category.Misc))
  }, [props.pageDefaults])

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
        <input placeholder='URL' className='App-input' onChange={onURLInputValueChange} value={pageURL} />
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
