import React, { useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import HomeView from './HomeView'
import routes from 'consts/routes'

const HomeController: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const dropdownItems = useMemo(
    () => [
      {
        label: 'Add article',
        callback: () => {
          props.history.push(routes.secret.editor)
        },
      },
      {
        label: 'Add page',
        callback: () => {
          props.history.push(routes.secret.addPage)
        },
      },
      {
        label: 'Add files',
        callback: () => {
          props.history.push(routes.secret.fileUpload)
        },
      },
    ],
    [],
  )

  return <HomeView dropdownItems={dropdownItems} />
}

export default HomeController
