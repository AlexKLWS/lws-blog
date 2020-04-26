import React, { useState } from 'react'

import './PagePreviewEditorWidget.scss'
import { Category } from 'types/materials'

interface Props {
  name: string
  subtitle: string
  icon: File | null
  iconWidth: string
  iconHeight: string
  category: Category
  setName: (value: string) => void
  setSubtitle: (value: string) => void
  setIcon: (value: File | null) => void
  setIconWidth: (value: string) => void
  setIconHeight: (value: string) => void
  setCategory: (value: Category) => void
}

const PagePreviewEditorWidget: React.FC<Props> = (props: Props) => {
  const onNameInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(event.target.value)
  }

  const onSubtitleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSubtitle(event.target.value)
  }

  const onArticleIconWidthValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setIconWidth(event.target.value)
  }

  const onArticleIconHeightValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setIconHeight(event.target.value)
  }

  const onIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return
    }
    props.setIcon(event.target.files[0])
  }

  return (
    <div className='PPEW-input-container'>
      <input className='PPEW-input' placeholder='Title' value={props.name} onChange={onNameInputValueChange} />
      <input
        className='PPEW-input'
        placeholder='Subtitle'
        value={props.subtitle}
        onChange={onSubtitleInputValueChange}
      />
      <input type='file' className='App-file-input' id='articleIcon' onChange={onIconFileChange} accept='.svg' />
      <label className='App-button' htmlFor='articleIcon'>
        {props.icon?.name || 'Add icon'}
      </label>
      {props.icon && (
        <div className='PPEW-icon-row'>
          <input
            className='PPEW-icon-dimensions-input'
            placeholder='Width'
            value={props.iconWidth}
            onChange={onArticleIconWidthValueChange}
          />
          <input
            className='PPEW-icon-dimensions-input'
            placeholder='Height'
            value={props.iconHeight}
            onChange={onArticleIconHeightValueChange}
          />
        </div>
      )}
    </div>
  )
}

export default PagePreviewEditorWidget
