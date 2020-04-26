import React, { useState } from 'react'

import './Dropdown.scss'
import { DropdownItem } from 'types/dropdown'

interface Props {
  dropdownTriggerText: string
  items: DropdownItem[]
}

const Dropdown: React.FC<Props> = (props: Props) => {
  const [dropdownIsOpen, setDropdownState] = useState(false)

  const onDropdownPress = () => {
    setDropdownState(!dropdownIsOpen)
  }

  return (
    <div className='Dropdown-container'>
      <div className={dropdownIsOpen ? 'Dropdown-trigger open' : 'Dropdown-trigger'} onClick={onDropdownPress}>
        {`+ ${props.dropdownTriggerText}`}
      </div>

      {dropdownIsOpen && (
        <ul className='Dropdown-menu-list'>
          {props.items.map((item: DropdownItem, index: number) => {
            return (
              <li key={`${item.label}-${index}`} className='Dropdown-item-container'>
                <input
                  value={`> ${item.label}`}
                  type='submit'
                  className={'Dropdown-item-button'}
                  onClick={() => {
                    onDropdownPress()
                    item.callback()
                  }}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
