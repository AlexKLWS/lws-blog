import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { useArrayInputDataProvider, useArrayItemValueInputDataProvider } from 'facades/MaterialData/inputDataFacade'

type Props = {
  serviceInstance: IMaterialDataService
  pathToArray: string
  index: number
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => JSX.Element
}

const ArrayItemInputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useArrayInputDataProvider(props.serviceInstance, props.pathToArray, props.index)

  return <>{props.render(dataUpdater)}</>
}

export default ArrayItemInputDataController
