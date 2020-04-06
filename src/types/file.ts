export interface UploadData {
  id: string
  folder?: string
  files?: FileData[]
}

export interface FileData {
  id: string
  file?: File
  newName?: string
}
