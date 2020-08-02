import React from 'react'

import './PagePreviewEditorWidget.scss'
import { Category } from 'types/materials'
import { IMaterialDataService } from 'services/materialData'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'
import EnumDropdown from 'components/Dropdowns/EnumDropdown/EnumDropdown'

type Props = {
  serviceInstance: IMaterialDataService
  categoryToggleDisabled?: boolean
}

const PagePreviewEditorWidget: React.FC<Props> = (props: Props) => {
  const getIconButtonText = (value: File | string | null) => {
    if (!value) {
      return 'Add icon'
    }
    if (!(value as File).name) {
      return 'Change icon'
    }
    return (value as File).name
  }

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
                    path={'icon.height'}
                    render={({ value, setValue }) => {
                      return (
                        <input
                          className='PPEW-icon-dimensions-input'
                          placeholder='Height'
                          value={value}
                          onChange={(event) => {
                            setValue(event.target.value)
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
        <span className='PPEW-dropdown-label'>Category:</span>
        <InputDataController
          serviceInstance={props.serviceInstance}
          path={'category'}
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
        />
      </div>
    </div>
  )
}

export default PagePreviewEditorWidget
