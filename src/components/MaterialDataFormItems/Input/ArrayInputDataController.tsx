import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { useArrayInputDataProvider } from 'facades/MaterialData/inputDataFacade'
import ArrayItemInputDataController from './ArrayItemInputDataController'

type Props = {
  defaultItem?: any
  serviceInstance: IMaterialDataService
  pathToArray: string
  renderContentContainer: (props: ContentContainerProps) => JSX.Element
  renderItem: (props: ItemProps) => JSX.Element
}

type ContentContainerProps = {
  onItemAddButtonPress: () => void
  itemsRenderList: JSX.Element[]
}

type ItemProps = {
  onItemRemoveButtonPress: () => void
  index: number
  value: any
  setValue: (newValue: any) => void
}

const ArrayInputDataController: React.FC<Props> = (props: Props) => {
  const { array, addItem, removeItem } = useArrayInputDataProvider(props.serviceInstance, props.pathToArray)

  const onItemAddButtonPress = () => {
    addItem(array.length, props.defaultItem)
  }

  const itemsRenderList = () => {
    return array.map((value: any, index: number) => {
      return (
        <ArrayItemInputDataController
          key={`${index}`}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          index={index}
          render={({ setValue }) =>
            props.renderItem({ value, setValue, index, onItemRemoveButtonPress: () => removeItem(index) })
          }
        />
      )
    })
  }

  return props.renderContentContainer({ onItemAddButtonPress, itemsRenderList: itemsRenderList() })
}

export default ArrayInputDataController
