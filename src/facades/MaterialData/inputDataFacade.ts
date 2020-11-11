import { useState, useEffect } from 'react'

import { IMaterialDataService } from 'services/materialData'
import { Subscription } from 'rxjs'
import { onEmit } from 'facades/helpers'

export const useInputDataProvider = (serviceInstance: IMaterialDataService, path: string, isArray?: boolean) => {
  const [value, setValueState] = useState(serviceInstance.getValueFor(path))

  const setValue = (newValue: any) => {
    serviceInstance.addField(path, newValue, isArray)
  }

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<any>(serviceInstance.getSubjectFor(path), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { value, setValue }
}

export const useArrayItemValueInputDataProvider = (
  serviceInstance: IMaterialDataService,
  pathToArray: string,
  pathToValue: string,
  index: number,
  isArray?: boolean,
) => {
  const [value, setValueState] = useState(serviceInstance.getArrayItemValueFor(pathToArray, pathToValue, index))

  const setValue = (newValue: any) => {
    serviceInstance.addFieldToArrayItem(pathToArray, pathToValue, newValue, index, isArray)
  }

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<any>(serviceInstance.getArrayItemValueSubjectFor(pathToArray, pathToValue, index), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { value, setValue }
}

export const useArrayInputDataProvider = (
  serviceInstance: IMaterialDataService,
  pathToArray: string,
  index: number,
) => {
  const [value, setValueState] = useState(serviceInstance.getArrayItemFor(pathToArray, index))

  const setValue = (newValue: any) => {
    serviceInstance.addArrayItem(pathToArray, index, newValue)
  }

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<any>(serviceInstance.getArrayItemSubjectFor(pathToArray, index), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { value, setValue }
}
