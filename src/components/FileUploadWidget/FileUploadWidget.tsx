import React, { useState, useRef } from 'react'

import './FileUploadWidget.scss'
import { FolderData, FileData } from 'types/file'
import FileListItem from './FileListItem'

interface Props {}

const FileUploadWidget = (props: Props) => {
  const folderSelectorId = useRef(0)
  const [folderDatas, setFolderDatas] = useState<FolderData[]>([{ id: String(folderSelectorId.current) }])

  const onFolderNameSpecify = (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => {
    const datas = [...folderDatas]
    const folderSelectorIndex = datas.findIndex((s) => s.id === data.id)

    datas[folderSelectorIndex] = {
      id: data.id,
      folder: event.target.value,
      files: data.files,
    }
    setFolderDatas(datas)
  }

  const onFilesAdd = (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => {
    const datas = [...folderDatas]
    const folderSelectorIndex = datas.findIndex((s) => s.id === data.id)

    const files: FileData[] = []
    if (event.target.files) {
      for (let index = 0; index < event.target.files.length; index++) {
        files.push({ id: data.id + String(index), file: event.target.files[index] })
      }
    }

    datas[folderSelectorIndex] = {
      id: data.id,
      folder: data.folder,
      files,
    }
    setFolderDatas(datas)
  }

  const addFolder = () => {
    folderSelectorId.current++
    setFolderDatas([...folderDatas, { id: String(folderSelectorId.current) }])
  }

  const removeFolder = (id: string) => {
    let datas = folderDatas.filter((selector) => selector.id !== id)
    if (!datas.length) {
      folderSelectorId.current++
      datas = [{ id: String(folderSelectorId.current) }]
    }
    setFolderDatas(datas)
  }

  const updateFilename = (data: FolderData, fileId: string, filename: string) => {
    const datas = [...folderDatas]
    const folderSelectorIndex = datas.findIndex((s) => s.id === data.id)

    for (const file of datas[folderSelectorIndex].files!) {
      if (file.id === fileId) {
        file.newName = filename
        break
      }
    }
    setFolderDatas(datas)
  }

  const renderFolderSelectors = () => {
    return folderDatas.map((data) => {
      return (
        <li className='FUW-selector-list-item' key={`${data.id}`}>
          <div className='FUW-selector-item-container'>
            <input
              placeholder='Specify folder name'
              className='App-input'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onFolderNameSpecify(data, event)
              }}
            />
            <div className='FUW-file-input-container'>
              <input
                type='file'
                className='App-file-input'
                id={`fileSelector-${data.id}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  onFilesAdd(data, event)
                }}
                accept='image/x-png,image/gif,image/jpeg'
                multiple
              />
              <label className='App-button' htmlFor={`fileSelector-${data.id}`}>
                {'Add files'}
              </label>
            </div>
            <input
              className='FUW-remove-button'
              onClick={() => {
                removeFolder(data.id)
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
                      updateFilename={(filename: string) => {
                        updateFilename(data, fileData.id, filename)
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
