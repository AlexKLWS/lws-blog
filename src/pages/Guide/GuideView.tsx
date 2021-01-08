import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import GoogleMapReact from 'google-map-react'

import './Guide.scss'

import { mapStyles } from 'consts/mapStyles'
import Footer from 'components/Footer/Footer'
import GuidePin from './components/GuidePin/GuidePin'
import { GuideLocationInfo, LocationCoords } from 'types/guide'
import GuideLocationInfoView from './components/GuideLocationInfo/GuideLocationInfoView'
import GuideLocationsListView from './components/GuideLocationsList/GuideLocationsListView'

const API_KEY = process.env.REACT_APP_GMAPS_API_KEY || ''
const LOCATION_INFO_ANIMATION_SYNC_DELAY = 400

type Props = {
  guideName: string
  guideSubtitle: string
  defaultZoom: number
  defaultCenter: LocationCoords
  guideInfo: string
  locations: GuideLocationInfo[]
}

const GuideView: React.FC<Props> = (props: Props) => {
  const defaultProps = {
    center: props.defaultCenter,
    zoom: props.defaultZoom,
  }

  const [currentLocationInfo, setCurrentLocationInfo] = useState<GuideLocationInfo>(props.locations[0])
  const [centerCoords, setCenterCoords] = useState<LocationCoords>(props.defaultCenter)
  const [locationInfoIsShown, setLocationInfoIsShown] = useState(false)
  const [locationsListIsOpen, setLocationsListIsOpen] = useState(false)

  const onPinPress = (location: GuideLocationInfo) => {
    setCurrentLocationInfo(location)
    setCenterCoords(location.coordinates)
    if (locationsListIsOpen) {
      setLocationsListIsOpen(false)
      setTimeout(() => {
        setLocationInfoIsShown(true)
      }, LOCATION_INFO_ANIMATION_SYNC_DELAY)
    } else {
      setLocationInfoIsShown(true)
    }
  }

  const onLocationPress = (location: GuideLocationInfo) => {
    setCurrentLocationInfo(location)
    setCenterCoords(location.coordinates)
    setTimeout(() => {
      setLocationInfoIsShown(true)
    }, LOCATION_INFO_ANIMATION_SYNC_DELAY)
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Helmet>
        <title>{`${props.guideName} - Alex Korzh`}</title>
        <meta name='description' content={props.guideSubtitle} />
      </Helmet>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={centerCoords}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          fullscreenControl: false,
          styles: mapStyles,
        }}
        onDragEnd={(map: any) => {
          setCenterCoords({ lat: map.center.lat(), lng: map.center.lng() })
        }}
      >
        {props.locations.map((location, index) => {
          return (
            <GuidePin
              key={`${index}`}
              type={location.type}
              lat={location.coordinates.lat}
              lng={location.coordinates.lng}
              onPinPress={() => {
                onPinPress(location)
              }}
            />
          )
        })}
      </GoogleMapReact>
      <div className={'Guide-content-container'}>
        <div className={'Guide-inner-content-container'}>
          <div className={'Guide-info-alignment-container'}>
            <GuideLocationsListView
              guideInfo={props.guideInfo}
              isDisabled={locationInfoIsShown}
              locationsListIsOpen={locationsListIsOpen}
              setLocationsListIsOpen={setLocationsListIsOpen}
              locations={props.locations}
              onLocationPress={onLocationPress}
            />
          </div>

          <GuideLocationInfoView
            locationInfo={currentLocationInfo}
            isShown={locationInfoIsShown}
            onCloseClick={() => {
              setLocationInfoIsShown(false)
            }}
          />

          <div style={{ flex: 1 }} />
        </div>
      </div>
      <div className={'Guide-footer-content-container'}>
        <div className={'Guide-footer-inner-content-container'}>
          <div className={'Guide-footer-wrapper'}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideView
