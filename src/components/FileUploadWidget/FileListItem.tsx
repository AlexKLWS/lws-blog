import React, { PropsWithChildren } from 'react'

import './FileUploadWidget.scss'
import { FileData } from 'types/file'

interface Props {
  fileData: FileData
  filename?: string
  updateFilename: (fileName: string) => void
  useFileItemData: (id: string) => [number, string, boolean]
}

const FileListItem = ({ fileData, filename, updateFilename, useFileItemData }: Props) => {
  const [uploadPercentage, fileURL, isError] = useFileItemData(fileData.id)

  return (
    <li className='FUW-file-list-item'>
      <div className='FUW-file-list-item-row'>
        <span className='FUW-file-list-item-name-label'>{fileData.file!.name}</span>
        <input
          placeholder='Rename upon upload'
          className='FUW-file-list-item-input'
          value={filename}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateFilename(event.target.value)
          }}
        />
      </div>
      <div className='FUW-file-list-item-row'>
        {fileURL ? (
          <>
            <span className='FUW-file-list-item-name-label'>{`File URL: `}</span>
            <span className='FUW-file-list-item-name-label bold'>{fileURL}</span>
          </>
        ) : (
          <span style={{ width: `${uploadPercentage}%`, height: '4px', backgroundColor: '#000' }} />
        )}
      </div>
      <div className='FUW-file-list-item-row'>
        {true && <span className='FUW-file-list-item-error'>{`There was an error uploading this file`}</span>}
      </div>
    </li>
  )
}

const propsComparator = (
  prevProps: Readonly<PropsWithChildren<Props>>,
  nextProps: Readonly<PropsWithChildren<Props>>,
) => prevProps.fileData.newName === nextProps.fileData.newName

export default React.memo(FileListItem, propsComparator)
