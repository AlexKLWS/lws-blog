import { useState } from 'react'

import { IMaterialDataService, MaterialDataServiceId } from 'services/materialData'

export const useInputDataProvider = (
  serviceInstance: IMaterialDataService,
  path: string,
  isArray?: boolean,
  defaults?: any,
) => {
  const [value, setValueState] = useState(defaults)

  const setValue = (newValue: any) => {
    serviceInstance.addField(path, newValue, isArray)
    setValueState(newValue)
  }

  return { value, setValue }
}

export const useArrayItemInputDataProvider = (
  serviceInstance: IMaterialDataService,
  pathToArray: string,
  pathToValue: string,
  index: number,
  isArray?: boolean,
  defaults?: any,
) => {
  const [value, setValueState] = useState(defaults)

  const setValue = (newValue: any) => {
    serviceInstance.addFieldToArrayItem(pathToArray, pathToValue, newValue, index, isArray)
    setValueState(newValue)
  }

  return { value, setValue }
}
