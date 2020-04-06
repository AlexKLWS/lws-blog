import React, { useState, useRef } from 'react'

import './FileUploadWidget.scss'
import { UploadData, FileData } from 'types/file'
import FileListItem from './FileListItem'

interface Props {}

const FileUploadWidget = (props: Props) => {
  const folderSelectorId = useRef(0)
  const [folderSelectors, setFolderSelectors] = useState<UploadData[]>([{ id: String(folderSelectorId.current) }])

  const onFolderNameSpecify = (selector: UploadData, event: React.ChangeEvent<HTMLInputElement>) => {
    const selectors = [...folderSelectors]
    const folderSelectorIndex = selectors.findIndex((s) => s.id === selector.id)

    selectors[folderSelectorIndex] = {
      id: selector.id,
      folder: event.target.value,
      files: selector.files,
    }
    setFolderSelectors(selectors)
  }

  const onFilesAdd = (selector: UploadData, event: React.ChangeEvent<HTMLInputElement>) => {
    const selectors = [...folderSelectors]
    const folderSelectorIndex = selectors.findIndex((s) => s.id === selector.id)

    const files: FileData[] = []
    if (event.target.files) {
      for (let index = 0; index < event.target.files.length; index++) {
        files.push({ id: selector.id + String(index), file: event.target.files[index] })
      }
    }

    selectors[folderSelectorIndex] = {
      id: selector.id,
      folder: selector.folder,
      files,
    }
    setFolderSelectors(selectors)
  }

  const addFolder = () => {
    folderSelectorId.current++
    setFolderSelectors([...folderSelectors, { id: String(folderSelectorId.current) }])
  }

  const removeFolder = (id: string) => {
    let selectors = folderSelectors.filter((selector) => selector.id !== id)
    if (!selectors.length) {
      folderSelectorId.current++
      selectors = [{ id: String(folderSelectorId.current) }]
    }
    setFolderSelectors(selectors)
  }

  const updateFilename = (selector: UploadData, fileId: string, filename: string) => {
    const selectors = [...folderSelectors]
    const folderSelectorIndex = selectors.findIndex((s) => s.id === selector.id)

    for (const file of selectors[folderSelectorIndex].files!) {
      if (file.id === fileId) {
        file.newName = filename
        break
      }
    }
    setFolderSelectors(selectors)
  }

  const renderFolderSelectors = () => {
    return folderSelectors.map((selector) => {
      return (
        <li className='FUW-selector-list-item' key={`${selector.id}`}>
          <div className='FUW-selector-item-container'>
            <input
              placeholder='Specify folder name'
              className='App-input'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onFolderNameSpecify(selector, event)
              }}
            />
            <div className='FUW-file-input-container'>
              <input
                type='file'
                className='App-file-input'
                id={`fileSelector-${selector.id}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  onFilesAdd(selector, event)
                }}
                accept='image/x-png,image/gif,image/jpeg'
                multiple
              />
              <label className='App-button' htmlFor={`fileSelector-${selector.id}`}>
                {'Add files'}
              </label>
            </div>
            <input
              className='FUW-remove-button'
              onClick={() => {
                removeFolder(selector.id)
              }}
              type='submit'
              value='-'
            />
          </div>
          <ul className='FUW-file-list'>
            {selector.files &&
              selector.files
                .map((fileData) => {
                  return fileData.file ? (
                    <FileListItem
                      key={`${selector.id}-${fileData.file.name}`}
                      fileData={fileData}
                      filename={fileData.newName}
                      updateFilename={(filename: string) => {
                        updateFilename(selector, fileData.id, filename)
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
      <div>
        <span className='FUW-label'>Folders: </span>
        <input className='FUW-add-button' onClick={addFolder} type='submit' value='+' />
      </div>
      <ul className='FUW-folder-selector-list'>{renderFolderSelectors()}</ul>
    </div>
  )
}

export default FileUploadWidget
