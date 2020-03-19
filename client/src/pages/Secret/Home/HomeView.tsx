import React from 'react'

import './Home.scss'

interface Props {}

const HomeView: React.FC<Props> = (props: Props) => {
  const onDropdownPress = () => {}

  return (
    <div>
      <div className='Login-button' onClick={onDropdownPress}>
        + Add
      </div>
    </div>
  )
}

export default HomeView
