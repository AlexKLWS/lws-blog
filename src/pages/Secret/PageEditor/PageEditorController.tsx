import React, { useState } from 'react'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'

const PageEditorController = () => {
  const [pageName, setPageName] = useState('')
  const [pageSubtitle, setPageSubtitle] = useState('')
  const [pageIcon, setPageIcon] = useState<File | null>(null)
  const [pageIconWidth, setPageIconWidth] = useState('')
  const [pageIconHeight, setPageIconHeight] = useState('')

  return (
    <div>
      <h1 className='App-title'>Page Editor</h1>
      <PagePreviewEditorWidget
        name={pageName}
        subtitle={pageSubtitle}
        icon={pageIcon}
        iconWidth={pageIconWidth}
        iconHeight={pageIconHeight}
        setName={setPageName}
        setSubtitle={setPageSubtitle}
        setIcon={setPageIcon}
        setIconWidth={setPageIconWidth}
        setIconHeight={setPageIconHeight}
      />
      <input placeholder='URL' className='App-input' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}} />
    </div>
  )
}

export default PageEditorController
