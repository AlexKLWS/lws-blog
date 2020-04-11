import React, { useState } from 'react'

import FileUploadView from './FileUploadView'
import { EditorError } from 'types/editor'

const FileUploadController = () => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  return <FileUploadView submitErrors={currentSubmitErrors} />
}

export default FileUploadController
