import React, { PropsWithChildren } from 'react'

import './FileUploadWidget.scss'
import { FileData } from 'types/file'

interface Props {
  fileData: FileData
  filename?: string
  updateFilename: (fileName: string) => void
}

const FileListItem = ({ fileData, filename, updateFilename }: Props) => {
  return (
    <li className='FUW-file-list-item'>
      <span className='FUW-file-list-item-name-label'>{fileData.file!.name}</span>
      <input
        placeholder='Rename upon upload'
        className='FUW-file-list-item-input'
        value={filename}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateFilename(event.target.value)
        }}
      />
    </li>
  )
}

const propsComparator = (
  prevProps: Readonly<PropsWithChildren<Props>>,
  nextProps: Readonly<PropsWithChildren<Props>>,
) => prevProps.fileData.newName === nextProps.fileData.newName

export default React.memo(FileListItem, propsComparator)
