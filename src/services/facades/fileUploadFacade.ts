import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { IFileUploadService, FileUploadServiceId } from 'services/fileUpload'
import { FolderData } from 'types/file'

export function useFileUploadFacade() {
  const service = useRef(useInjection<IFileUploadService>(FileUploadServiceId))
  const uploadFiles = (folderData: FolderData[], uploadProgressCallback: (progressEvent: any) => void) => {
    service.current.uploadFiles(folderData, uploadProgressCallback)
  }

  return [uploadFiles]
}
