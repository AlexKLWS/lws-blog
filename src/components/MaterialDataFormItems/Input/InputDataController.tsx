import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { useInputDataProvider } from 'facades/MaterialData/inputDataFacade'

type Props = {
  serviceInstance: IMaterialDataService
  path: string
  isArray?: boolean
  defaults?: any
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => JSX.Element
}

const InputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useInputDataProvider(props.serviceInstance, props.path, props.isArray, props.defaults)

  return <>{props.render(dataUpdater)}</>
}

export default InputDataController
