import { injectable, id } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { FolderData, UploadMetaData } from 'types/file'

export interface IFileUploadService {
  uploadFiles: (folderData: FolderData[], uploadProgressCallback: (progressEvent: any) => void) => Promise<void>
}

@injectable()
export class FileUploadService implements IFileUploadService {
  private createMetadata(folderData: FolderData[]) {
    const folderMetadatas: UploadMetaData[] = []
    for (const folder of folderData) {
      const files = folder.files
        ? folder.files.map((file) => ({
            id: file.id,
            referenceId: uuidv4(),
          }))
        : []
      folderMetadatas.push({
        id: folder.id,
        folder: folder.folder || '',
        files,
      })
    }
    return {
      metaData: folderMetadatas,
    }
  }

  public async uploadFiles(folderData: FolderData[], uploadProgressCallback: (progressEvent: any) => void) {
    const metaData = this.createMetadata(folderData)

    const metaDataRequest: AxiosRequestConfig = {
      method: 'POST',
      onUploadProgress: uploadProgressCallback,
      url: `${apiEndpoint}/files/metadata`,
      data: metaData,
    }

    try {
      const metaDataResponse = await axios(metaDataRequest)
      const metaDataResponseStatus = metaDataResponse.status
      console.log('METADATA-UPLOAD-STATUS: ', metaDataResponseStatus)
    } catch (error) {}
  }
}

export const FileUploadServiceId = Symbol('FileUploadService')
