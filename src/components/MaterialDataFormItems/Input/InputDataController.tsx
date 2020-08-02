import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { useInputDataProvider } from 'facades/MaterialData/inputDataFacade'
import { useMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'

type Props = {
  service: IMaterialDataService
  path: string
  isArray?: boolean
  defaults?: any
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => React.Component
}

const InputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useInputDataProvider(props.service, props.path, props.isArray, props.defaults)

  return <>{props.render(dataUpdater)}</>
}

export default InputDataController
