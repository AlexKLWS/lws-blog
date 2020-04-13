export interface FolderData {
  id: string
  folder?: string
  files?: FileData[]
}

export interface FileData {
  id: string
  file: File
  newName?: string
  referenceId?: string
}

export interface FileMetaData {
  id: string
  folder?: string
  newName?: string
}

export interface UploadMetaDataBody {
  metaData: FileMetaData[]
}

export interface FileUploadForm {
  referenceId: string
  file: File
}
