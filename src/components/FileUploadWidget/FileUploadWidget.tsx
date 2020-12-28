import React from 'react'

import './FileUploadWidget.scss'
import { FolderData } from 'types/file'
import FileListItem from './FileListItem'

interface Props {
  folderDatas: FolderData[]
  isError: boolean
  onUploadButtonClick: () => void
  onFolderNameSpecify: (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesAdd: (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => void
  addFolder: () => void
  removeFolder: (id: string) => void
  updateFilename: (data: FolderData, fileId: string, filename: string) => void
  useFileItemData: (id: string) => [number, string, boolean]
}

const FileUploadWidget: React.FC<Props> = (props: Props) => {
  const renderFolderSelectors = () => {
    return props.folderDatas.map((data) => {
      return (
        <li className='FUW-selector-list-item' key={`${data.id}`}>
          <div className='FUW-selector-item-container'>
            <input
              placeholder='Specify folder name'
              className='App-input'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onFolderNameSpecify(data, event)
              }}
            />
            <div className='FUW-file-input-container'>
              <input
                type='file'
                className='App-file-input'
                id={`fileSelector-${data.id}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.onFilesAdd(data, event)
                }}
                accept='image/x-png,image/gif,image/jpeg,image/png'
                multiple
              />
              <label className='App-button' htmlFor={`fileSelector-${data.id}`}>
                {'Add files'}
              </label>
            </div>
            <input
              className='App-button'
              onClick={() => {
                props.removeFolder(data.id)
              }}
              type='submit'
              value='-'
            />
          </div>
          <ul className='FUW-file-list'>
            {data.files &&
              data.files
                .map((fileData) => {
                  return fileData.file ? (
                    <FileListItem
                      key={`${data.id}-${fileData.file.name}`}
                      fileData={fileData}
                      filename={fileData.newName}
                      useFileItemData={props.useFileItemData}
                      updateFilename={(filename: string) => {
                        props.updateFilename(data, fileData.id, filename)
                      }}
                    />
                  ) : null
                })
                .filter((element) => element !== null)}
          </ul>
        </li>
      )
    })
  }

  return (
    <div className='FUW-container'>
      <div style={{ display: 'flex' }}>
        <span className='App-label'>Folders: </span>
        <input className='App-button' onClick={props.addFolder} type='submit' value='+' />
      </div>
      <ul className='FUW-folder-selector-list'>{renderFolderSelectors()}</ul>
      <div className='FUW-file-list-item-row'>
        {props.isError && <span className='FUW-file-list-item-error'>{`There was an error uploading metadata`}</span>}
      </div>
      <div className='FUW-upload-button-container'>
        <input className='App-button' onClick={props.onUploadButtonClick} type={'submit'} value={'Upload Files'} />
      </div>
    </div>
  )
}

export default FileUploadWidget
