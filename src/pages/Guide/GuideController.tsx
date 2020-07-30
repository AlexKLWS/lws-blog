import React from 'react'

import GuideView from './GuideView'
import { GuideLocationInfo, LocationType } from 'types/guide'

const lol = 'https://www.restoclub.ru/uploads/place_thumbnail_big/f/5/b/8/f5b8d77a0531a246858dc2989f48f48c.jpg'
const ziz = 'https://www.restoclub.ru/uploads/place_thumbnail_big/3/e/1/a/3e1ad9392cb3940eec0ba6b40cc0d694.jpg'
const sos = 'https://storage.yandexcloud.net/incrussia-prod/wp-content/uploads/2017/06/2_-2.jpg'

const pins: GuideLocationInfo[] = [
  {
    type: LocationType.BAR,
    coordinates: { lat: 59.955413, lng: 30.337844 },
    title: 'Enthusiast Bar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec augue sit amet velit rhoncus viverra ac vel ligula. Cras a sapien et risus lacinia tristique. Proin velit arcu, porta non finibus et, pulvinar eget felis.',
    imageUrl: lol,
    address: 'Deulstraße 29, Berlin, 12459',
  },
  {
    type: LocationType.CAFE,
    coordinates: { lat: 59.957, lng: 30.345 },
    title: 'Zinziver',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec augue sit amet velit rhoncus viverra ac vel ligula. Cras a sapien et risus lacinia tristique. Proin velit arcu, porta non finibus et, pulvinar eget felis.',
    imageUrl: ziz,
    address: 'Deulstraße 29, Berlin, 12459',
  },
  {
    type: LocationType.RESTAURANT,
    coordinates: { lat: 59.959, lng: 30.355 },
    title: 'Sosna i Lipa',
    description:
      'Quisque tempor risus id maximus blandit. Ut sagittis, libero in lobortis viverra, tortor ante mattis eros, sed commodo odio augue vitae enim.',
    imageUrl: sos,
    address: 'Deulstraße 29, Berlin, 12459',
  },
]

const GuideController: React.FC = () => {
  return (
    <GuideView
      guideInfo={
        'Hey really impressive script, it also works to get any other property (top level at least) from the package.json file!'
      }
      locations={pins}
      defaultZoom={13}
      defaultCenter={{
        lat: 59.95,
        lng: 30.33,
      }}
    />
  )
}

export default GuideController
