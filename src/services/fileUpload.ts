import { injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { FolderData, FileMetaData, UploadMetaDataBody, FileUploadFormData } from 'types/file'
import { BehaviorSubject } from 'rxjs'

export interface IFileUploadService {
  getFileUploadStatus: (fileItemId: string) => BehaviorSubject<number>
  getFileURL: (fileItemId: string) => BehaviorSubject<string>
  getUploadError: (fileItemId: string) => BehaviorSubject<boolean>
  uploadFiles: (folderData: FolderData[]) => Promise<void>
}

@injectable()
export class FileUploadService implements IFileUploadService {
  private readonly _fileUploadStatuses: { [fileItemId: string]: BehaviorSubject<number> } = {}
  private readonly _fileURLs: { [fileItemId: string]: BehaviorSubject<string> } = {}
  private readonly _uploadErrors: { [fileItemId: string]: BehaviorSubject<boolean> } = {}

  public getFileUploadStatus(fileItemId: string): BehaviorSubject<number> {
    if (!this._fileUploadStatuses[fileItemId]) {
      this._fileUploadStatuses[fileItemId] = new BehaviorSubject<number>(0)
    }
    return this._fileUploadStatuses[fileItemId]
  }

  public getFileURL(fileItemId: string): BehaviorSubject<string> {
    if (!this._fileURLs[fileItemId]) {
      this._fileURLs[fileItemId] = new BehaviorSubject<string>('')
    }
    return this._fileURLs[fileItemId]
  }

  public getUploadError(fileItemId: string): BehaviorSubject<boolean> {
    if (!this._uploadErrors[fileItemId]) {
      this._uploadErrors[fileItemId] = new BehaviorSubject<boolean>(false)
    }
    return this._uploadErrors[fileItemId]
  }

  public async uploadFiles(folderData: FolderData[]) {
    // Not very efficient, but the code is cleaner
    // TODO: Think how to refactor
    this.assignReferenceIdsToFiles(folderData)
    const data = this.createMetadata(folderData)

    const metaDataRequest: AxiosRequestConfig = {
      method: 'PUT',
      url: `${apiEndpoint}/files/metadata`,
      withCredentials: true,
      data,
    }

    try {
      const response = await axios(metaDataRequest)
    } catch (error) {
      return
    }

    const formData = this.createFormdata(folderData)

    formData.forEach(async ({ fileItemId, data }) => {
      const fileDataRequest: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'PUT',
        onUploadProgress: this.onUploadProgressFactory(fileItemId),
        url: `${apiEndpoint}/files`,
        withCredentials: true,
        data,
      }
      try {
        const fileURLResponse = await axios(fileDataRequest)
        const fileURL = await fileURLResponse.data()
        this._fileURLs[fileItemId].next(fileURL)
      } catch (_) {
        this._uploadErrors[fileItemId].next(true)
      }
    })
  }

  private onUploadProgressFactory(fileItemId: string) {
    return (progressEvent: any) => {
      this._fileUploadStatuses[fileItemId].next(Math.round((progressEvent.loaded * 100) / progressEvent.total))
    }
  }

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
    return {
      metaData: folderMetadatas,
    }
  }

  private createFormdata(folderData: FolderData[]): FileUploadFormData[] {
    const formDatas: FileUploadFormData[] = []
    for (const folder of folderData) {
      if (!folder.files) {
        continue
      }
      for (const file of folder.files) {
        const data = new FormData()
        data.append('referenceId', file.referenceId!)
        data.append('file', file.file!)
        formDatas.push({
          fileItemId: file.id,
          data,
        })
      }
    }
    return formDatas
  }
}

export const FileUploadServiceId = Symbol('FileUploadService')
