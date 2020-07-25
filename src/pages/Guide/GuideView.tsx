import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import './Guide.scss'

import { mapStyles } from 'consts/mapStyles'
import Footer from 'components/Footer/Footer'
import GuidePin from 'components/GuidePin/GuidePin'
import { GuideLocationInfo, LocationCoords } from 'types/guide'
import GuideLocationInfoView from 'components/GuideLocationInfo/GuideLocationInfoView'
import GuideLocationsListView from 'components/GuideLocationsList/GuideLocationsListView'

type Props = {
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

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
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
                setCurrentLocationInfo(location)
                setCenterCoords(location.coordinates)
                if (locationsListIsOpen) {
                  setLocationsListIsOpen(false)
                  setTimeout(() => {
                    setLocationInfoIsShown(true)
                  }, 400)
                } else {
                  setLocationInfoIsShown(true)
                }
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
              onLocationClick={(location) => {
                setCurrentLocationInfo(location)
                setCenterCoords(location.coordinates)
                setTimeout(() => {
                  setLocationInfoIsShown(true)
                }, 400)
              }}
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
          <div className={'Guide-footer-container'}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideView
