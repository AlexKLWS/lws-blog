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
    let folderMetadatas: FileMetaData[] = []
    for (const folder of folderData) {
      const files: FileMetaData[] = !!folder.files
        ? folder.files.map((file) => {
            return {
              folder: folder.folder,
              newName: file.newName,
              id: file.referenceId!,
            }
          })
        : []
      folderMetadatas = folderMetadatas.concat(files)
    }
    console.log('FOLDER-METADATAS: ', folderMetadatas)
    return {
      metaData: folderMetadatas,
    }
  }

  private createFormdata(folderData: FolderData[]): FormData[] {
    const formDatas: FormData[] = []
    for (const folder of folderData) {
      if (!folder.files) {
        continue
      }
      for (const file of folder.files) {
        const data = new FormData()
        data.append('referenceId', file.referenceId!)
        data.append('file', file.file!)
        formDatas.push(data)
      }
    }
    return formDatas
  }

  public async uploadFiles(folderData: FolderData[], uploadProgressCallback: (progressEvent: any) => void) {
    console.log('FOLDER-DATA: ', folderData)
    // Not very efficient, but the code is cleaner
    // TODO: Think how to refactor
    this.assignReferenceIdsToFiles(folderData)
    const data = this.createMetadata(folderData)

    const metaDataRequest: AxiosRequestConfig = {
      method: 'PUT',
      onUploadProgress: uploadProgressCallback,
      url: `${apiEndpoint}/files/metadata`,
      withCredentials: true,
      data,
    }

    try {
      console.log('SENDING-DATA: ', data)
      const response = await axios(metaDataRequest)
      console.log('RESPONSE-CODE: ', response.status)
    } catch (error) {}

    const formData = this.createFormdata(folderData)
    await Promise.all(
      formData.map(async (data) => {
        const fileDataRequest: AxiosRequestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          method: 'PUT',
          onUploadProgress: uploadProgressCallback,
          url: `${apiEndpoint}/files`,
          withCredentials: true,
          data,
        }
        const fileURLResponse = await axios(fileDataRequest)
        const fileURL = await fileURLResponse.data()
        console.log('FILE-UPLOADED-WITH-URL: ', fileURL)
      }),
    ).catch((error) => {
      console.log('FILE-UPLOAD-ERROR: ', error)
    })
  }
}

export const FileUploadServiceId = Symbol('FileUploadService')
