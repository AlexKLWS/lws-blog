import React, { useMemo } from 'react'
import { RouteProps, useHistory } from 'react-router-dom'

import HomeView from './HomeView'
import { DropdownItem } from 'types/dropdown'
import routes from 'consts/routes'

const HomeController: React.FC<RouteProps> = (props: RouteProps) => {
  const history = useHistory()
  const dropdownItems = useMemo(
    () => [
      {
        label: 'Add article',
        callback: () => {
          history.push(routes.secret.editor)
        },
      },
      {
        label: 'Add page',
        callback: () => {
          history.push(routes.secret.addPage)
        },
      },
      {
        label: 'Add files',
        callback: () => {
          history.push(routes.secret.fileUpload)
        },
      },
    ],
    [],
  )

  return <HomeView dropdownItems={dropdownItems} />
}

export default HomeController
