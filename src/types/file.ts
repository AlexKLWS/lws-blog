export interface FolderData {
  id: string
  folder?: string
  files?: FileData[]
}

export interface FileData {
  id: string
  file?: File
  referenceId?: string
  newName?: string
}

export interface UploadMetaData {
  id: string
  folder: string
  files: FileMetaData[]
}

export interface FileMetaData {
  id: string
  referenceId: string
}
