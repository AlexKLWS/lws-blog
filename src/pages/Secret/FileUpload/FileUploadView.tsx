import React, { useState } from 'react'

import './FileUpload.scss'
import FileUploadWidget from 'components/FileUploadWidget'
import SubmitModal from 'components/Secret/SubmitModal'
import { EditorError } from 'types/editor'

interface Props {
  submitErrors: EditorError[]
}

const FileUploadView = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onSubmitButtonClick = () => {}

  const onSubmit = () => {}

  return (
    <div>
      <h1 className='App-title'>Upload Files</h1>
      <FileUploadWidget />
      <div className='FU-button-container'>
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

export default FileUploadView
