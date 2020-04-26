import React from 'react'

import Dropdown from 'components/Dropdown/Dropdown'
import { DropdownItem } from 'types/dropdown'

interface Props {
  dropdownItems: DropdownItem[]
}

const HomeView: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Dropdown dropdownTriggerText={'Add'} items={props.dropdownItems} />
    </div>
  )
}

export default HomeView
