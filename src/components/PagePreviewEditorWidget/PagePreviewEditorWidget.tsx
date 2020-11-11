import React, { useMemo, useState } from 'react'

import './PagePreviewEditorWidget.scss'
import { Category } from 'types/materials'
import { IMaterialDataService } from 'services/materialData'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'
import EnumDropdown from 'components/Dropdowns/EnumDropdown/EnumDropdown'
import ArrayItemInputDataController from 'components/MaterialDataFormItems/Input/ArrayItemInputDataController'

type Props = {
  serviceInstance: IMaterialDataService
  categoryToggleDisabled?: boolean
}

const PagePreviewEditorWidget: React.FC<Props> = (props: Props) => {
  const [categoriesCount, setCategoriesCount] = useState(0)

  const getIconButtonText = (value: File | string | null) => {
    if (!value) {
      return 'Add icon'
    }
    if (!(value as File).name) {
      return 'Change icon'
    }
    return (value as File).name
  }

  const renderCategories = useMemo(() => {
    const items = []
    let i = 0
    while (i < categoriesCount) {
      items.push(
        <ArrayItemInputDataController
          serviceInstance={props.serviceInstance}
          index={i}
          pathToArray={'categories'}
          render={({ value, setValue }) => {
            return (
              <EnumDropdown
                sourceEnum={Category as any}
                value={value}
                setValue={setValue}
                disabled={props.categoryToggleDisabled}
              />
            )
          }}
        />,
      )
      i++
    }
    return items
  }, [categoriesCount])

  return (
    <div className='PPEW-input-container'>
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'name'}
        render={({ value, setValue }) => {
          return (
            <input
              className='PPEW-input'
              placeholder='Title'
              value={value}
              onChange={(event) => {
                setValue(event.target.value)
              }}
            />
          )
        }}
      />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'subtitle'}
        render={({ value, setValue }) => {
          return (
            <input
              className='PPEW-input'
              placeholder='Subtitle'
              value={value}
              onChange={(event) => {
                setValue(event.target.value)
              }}
            />
          )
        }}
      />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'icon.data'}
        render={({ value, setValue }) => {
          const onIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files || !event.target.files[0]) {
              return
            }
            setValue(event.target.files[0])
          }
          return (
            <>
              <input
                type='file'
                className='App-file-input'
                id='articleIcon'
                onChange={onIconFileChange}
                accept='.svg'
              />
              <label className='App-button' htmlFor='articleIcon'>
                {getIconButtonText(value)}
              </label>
              {value && (
                <div className='PPEW-icon-row'>
                  <InputDataController
                    serviceInstance={props.serviceInstance}
                    path={'icon.width'}
                    render={({ value, setValue }) => {
                      return (
                        <input
                          className='PPEW-icon-dimensions-input'
                          placeholder='Width'
                          type='number'
                          value={value}
                          onChange={(event) => {
                            setValue(Number(event.target.value))
                          }}
                        />
                      )
                    }}
                  />
                  <InputDataController
                    serviceInstance={props.serviceInstance}
                    path={'icon.height'}
                    render={({ value, setValue }) => {
                      return (
                        <input
                          className='PPEW-icon-dimensions-input'
                          placeholder='Height'
                          type='number'
                          value={value}
                          onChange={(event) => {
                            setValue(Number(event.target.value))
                          }}
                        />
                      )
                    }}
                  />
                </div>
              )}
            </>
          )
        }}
      />
      <div className='PPEW-dropdown-container'>
        <span className='PPEW-dropdown-label'>Categories:</span>
        {renderCategories}
      </div>
    </div>
  )
}

export default PagePreviewEditorWidget
