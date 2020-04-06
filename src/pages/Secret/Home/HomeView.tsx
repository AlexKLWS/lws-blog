import React, { useState } from 'react'

import './Home.scss'
import routes from 'consts/routes'
import { Link } from 'react-router-dom'

interface Props {}

const HomeView: React.FC<Props> = (props: Props) => {
  const [dropdownIsOpen, setDropdownState] = useState(false)

  const onDropdownPress = () => {
    setDropdownState(!dropdownIsOpen)
  }

  return (
    <div>
      <div className='SecretHome-dropdown-container'>
        <div className={dropdownIsOpen ? 'SecretHome-dropdown open' : 'SecretHome-dropdown'} onClick={onDropdownPress}>
          + Add
        </div>

        {dropdownIsOpen && (
          <ul className='SecretHome-dropdown-list'>
            <li className='SecretHome-dropdown-item'>
              <Link to={routes.secret.editor} className={'SecretHome-dropdown'}>
                > Add article
              </Link>
            </li>
            <li className='SecretHome-dropdown-item'>
              <Link to={routes.secret.addPage} className={'SecretHome-dropdown'}>
                > Add page
              </Link>
            </li>
            <li className='SecretHome-dropdown-item'>
              <Link to={routes.secret.fileUpload} className={'SecretHome-dropdown'}>
                > Add files
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default HomeView
