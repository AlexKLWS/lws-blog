import React, { useState } from 'react'

import './PagePreviewEditorWidget.scss'
import InlineIcon from 'components/InlineIcon'

interface Props {
  name: string
  subtitle: string
  icon: string
  iconWidth: string
  iconHeight: string
  setName: (value: string) => void
  setSubtitle: (value: string) => void
  setIcon: (value: string) => void
  setIconWidth: (value: string) => void
  setIconHeight: (value: string) => void
}

const PagePreviewEditorWidget: React.FC<Props> = (props: Props) => {
  const [iconSvgFile, setIconSVGFile] = useState<File | null>(null)

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

  const parseSVG = async (file: File) => {
    // @ts-ignore
    const text = await file.text()
    props.setIcon(text)
  }

  const onIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      setIconSVGFile(null)
      props.setIcon('')
      return
    }
    setIconSVGFile(event.target.files[0])
    parseSVG(event.target.files[0])
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
        {iconSvgFile?.name || 'Add icon'}
      </label>
      {props.icon.length > 0 && (
        <div className='PPEW-icon-row'>
          <div className='PPEW-icon-container'>
            <InlineIcon svg={props.icon} />
          </div>
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