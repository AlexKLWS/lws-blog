import { injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { FolderData, FileMetaData, UploadMetaDataBody } from 'types/file'

export interface IFileUploadService {
  uploadFiles: (folderData: FolderData[], uploadProgressCallback: (progressEvent: any) => void) => Promise<void>
}

@injectable()
export class FileUploadService implements IFileUploadService {
  private assignReferenceIdsToFiles(folderData: FolderData[]) {
    for (const folder of folderData) {
      if (!folder.files) {
        continue
      }
      for (const file of folder.files) {
        file.referenceId = uuidv4()
      }
    }
  }

  private createMetadata(folderData: FolderData[]): UploadMetaDataBody {
    const folderMetadatas: FileMetaData[] = []
    for (const folder of folderData) {
      const files: FileMetaData[] = folder.files
        ? folder.files.map((file) => {
            return {
              folder: folder.folder,
              newName: file.newName,
              id: file.referenceId!,
            }
          })
        : []
      folderMetadatas.concat(files)
    }
    return {
      metaData: folderMetadatas,
    }
  }

  public async uploadFiles(folderData: FolderData[], uploadProgressCallback: (progressEvent: any) => void) {
    // Not very efficient, but the code is cleaner
    // TODO: Think how to refactor
    this.assignReferenceIdsToFiles(folderData)
    const data = this.createMetadata(folderData)

    const metaDataRequest: AxiosRequestConfig = {
      method: 'POST',
      onUploadProgress: uploadProgressCallback,
      url: `${apiEndpoint}/files/metadata`,
      withCredentials: true,
      data,
    }

    try {
      const metaDataResponse = await axios(metaDataRequest)
      const metaDataResponseStatus = metaDataResponse.status
      console.log('METADATA-UPLOAD-STATUS: ', metaDataResponseStatus)
    } catch (error) {}
  }
}

export const FileUploadServiceId = Symbol('FileUploadService')
