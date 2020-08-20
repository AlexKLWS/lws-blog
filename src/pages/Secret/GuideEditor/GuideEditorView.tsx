import React, { useState, useMemo } from 'react'

import './GuideEditor.scss'

import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import { GuideData } from 'types/materials'
import FileUploadWidget from 'components/FileUploadWidget'
import SubmitModal from 'components/Secret/SubmitModal'
import { EditorError } from 'types/verifier'
import GuideLocationItem from './GuideLocationItem'
import { IMaterialDataService } from 'services/materialData'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'

type Props = {
  serviceInstance: IMaterialDataService
  submitErrors: EditorError[]
  guideDefaults: GuideData | null
  onSubmitButtonClick: () => void
}

const GuideEditorView: React.FC<Props> = (props: Props) => {
  const [locationsCount, setLocationsCount] = useState(0)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onSubmit = () => {}

  const onAddButtonPress = () => {
    props.serviceInstance.addArrayItem('locations')
    setLocationsCount(locationsCount + 1)
  }

  const onRemoveButtonPress = () => {
    setLocationsCount(locationsCount - 1)
  }

  const renderLocationItems = useMemo(() => {
    const items = []
    let i = 0
    while (i < locationsCount) {
      items.push(
        <GuideLocationItem
          key={`${i}`}
          serviceInstance={props.serviceInstance}
          index={i}
          pathToArray={'locations'}
          onRemoveButtonPress={onRemoveButtonPress}
        />,
      )
      i++
    }
    return items
  }, [locationsCount])

  return (
    <div>
      <h1 className='App-title'>Guide Editor</h1>
      <PagePreviewEditorWidget serviceInstance={props.serviceInstance} categoryToggleDisabled />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'defaultZoom'}
        render={({ value, setValue }) => {
          return (
            <input
              className='GE-input'
              placeholder='Default Zoom'
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
            <div className='GE-coordinates-input-container'>
              <input
                className='GE-input'
                placeholder='Latitude'
                value={value ? value.lat : ''}
                onChange={(event) => {
                  setValue({ lat: event.target.value, lng: (!!value && value.lng) || '' })
                }}
              />
              <input
                className='GE-input'
                placeholder='Longitude'
                value={value ? value.lng : ''}
                onChange={(event) => {
                  setValue({ lng: event.target.value, lat: (!!value && value.lat) || '' })
                }}
              />
            </div>
          )
        }}
      />
      <div className='GE-add-locations-button-container'>
        <input className='App-button' onClick={onAddButtonPress} type={'submit'} value={'Add Location'} />
      </div>
      <ul style={{ listStyleType: 'none' }}>{renderLocationItems}</ul>
      <div className='GE-button-container'>
        <input className='App-button' onClick={props.onSubmitButtonClick} type={'submit'} value={'Submit'} />
      </div>
      <FileUploadWidget />
      <SubmitModal
        modalIsOpen={modalIsOpen}
        submitErrors={props.submitErrors}
        setModalIsOpen={setModalIsOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default GuideEditorView
