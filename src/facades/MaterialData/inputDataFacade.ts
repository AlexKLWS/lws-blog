import { useState, useEffect } from 'react'

import { IMaterialDataService } from 'services/materialData'
import { Subscription } from 'rxjs'
import { onEmit } from 'facades/helpers'

export const useInputDataProvider = (
  serviceInstance: IMaterialDataService,
  path: string,
  isArray?: boolean,
  defaults?: any,
) => {
  const [value, setValueState] = useState(defaults)

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
  }

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<any>(serviceInstance.getArrayItemSubjectFor(pathToArray, pathToValue, index), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { value, setValue }
}
