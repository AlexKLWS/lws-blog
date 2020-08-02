import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { useArrayItemInputDataProvider } from 'facades/MaterialData/inputDataFacade'

type Props = {
  serviceInstance: IMaterialDataService
  pathToArray: string
  pathToValue: string
  index: number
  isArray?: boolean
  defaults?: any
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => JSX.Element
}

const ArrayItemInputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useArrayItemInputDataProvider(
    props.serviceInstance,
    props.pathToArray,
    props.pathToValue,
    props.index,
    props.isArray,
    props.defaults,
  )

  return <>{props.render(dataUpdater)}</>
}

export default ArrayItemInputDataController
