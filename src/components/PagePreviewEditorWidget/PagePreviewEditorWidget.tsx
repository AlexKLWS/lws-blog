import React, { useState, useMemo } from 'react'

import './PagePreviewEditorWidget.scss'
import { Category } from 'types/materials'
import { DropdownItem } from 'types/dropdown'
import Dropdown from 'components/Dropdown/Dropdown'

interface Props {
  name: string
  subtitle: string
  icon: File | string | null
  iconWidth: string
  iconHeight: string
  category: Category
  setName: (value: string) => void
  setSubtitle: (value: string) => void
  setIcon: (value: File | string | null) => void
  setIconWidth: (value: string) => void
  setIconHeight: (value: string) => void
  setCategory?: (value: Category) => void
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

  const dropdownItems: DropdownItem[] = useMemo(() => {
    const items: DropdownItem[] = []
    for (let item in Category) {
      const index = Number(item)
      if (typeof index === 'number' && !isNaN(index)) {
        const category = Category[index]
        items.push({
          label: category,
          callback: () => {
            if (props.setCategory) {
              props.setCategory(index)
            }
          },
        })
      }
    }
    return items
  }, [])

  const getIconButtonText = () => {
    if (!props.icon) {
      return 'Add icon'
    }
    if (!(props.icon as File).name) {
      return 'Change icon'
    }
    return (props.icon as File).name
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
        {getIconButtonText()}
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
      <div className='PPEW-dropdown-container'>
        <span className='PPEW-dropdown-label'>Category:</span>
        <Dropdown dropdownTriggerText={Category[props.category]} items={dropdownItems} disabled={!props.setCategory} />
      </div>
    </div>
  )
}

export default PagePreviewEditorWidget
