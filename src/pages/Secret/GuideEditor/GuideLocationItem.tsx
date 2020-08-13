import React from 'react'

import { LocationType } from 'types/guide'
import ArrayItemInputDataController from 'components/MaterialDataFormItems/Input/ArrayItemInputDataController'
import { IMaterialDataService } from 'services/materialData'
import EnumDropdown from 'components/Dropdowns/EnumDropdown/EnumDropdown'

type Props = {
  serviceInstance: IMaterialDataService
  pathToArray: string
  index: number
  onRemoveButtonPress: () => void
}

const GuideLocationItem: React.FC<Props> = (props: Props) => {
  const onRemoveButtonPress = () => {
    props.serviceInstance.removeArrayItem(props.pathToArray, props.index)
    props.onRemoveButtonPress()
  }

  return (
    <li style={{ padding: '0px 0px 40px 0px' }}>
      <div className='GE-location-item-input-container'>
        <ArrayItemInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'locationType'}
          render={({ value, setValue }) => {
            return <EnumDropdown sourceEnum={LocationType as any} value={value} setValue={setValue} />
          }}
        />
      </div>
      <div className='GE-location-item-input-container'>
        <ArrayItemInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'title'}
          render={({ value, setValue }) => {
            return (
              <input
                placeholder='Title'
                className='GE-input'
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                value={value}
              />
            )
          }}
        />
      </div>
      <div className='GE-location-item-input-container'>
        <ArrayItemInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'description'}
          render={({ value, setValue }) => {
            return (
              <input
                placeholder='Description'
                className='GE-input'
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                value={value}
              />
            )
          }}
        />
      </div>
      <div className='GE-coordinates-input-container'>
        <ArrayItemInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'coordinates'}
          render={({ value, setValue }) => {
            return (
              <>
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
              </>
            )
          }}
        />
      </div>
      <div className='GE-location-item-input-container'>
        <ArrayItemInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'address'}
          render={({ value, setValue }) => {
            return (
              <input
                placeholder='Address'
                className='GE-input'
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                value={value}
              />
            )
          }}
        />
      </div>
      <div className='GE-location-item-input-container'>
        <ArrayItemInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'imageUrl'}
          render={({ value, setValue }) => {
            return (
              <input
                placeholder='Image URL'
                className='GE-input'
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                value={value}
              />
            )
          }}
        />
      </div>
      <div className='GE-location-item-input-container'>
        <input className='App-button' onClick={onRemoveButtonPress} type={'submit'} value={'Remove'} />
      </div>
    </li>
  )
}

export default GuideLocationItem
