import { injectable } from 'inversify'

export interface IMaterialDataService {
  currentData: any
  addField: (path: string, value: any, isArray?: boolean) => void
  addFieldToArrayItem: (
    pathToArray: string,
    pathToItemValue: string,
    value: any,
    index: number,
    addToArray?: boolean,
  ) => void
}

@injectable()
export class MaterialDataService implements IMaterialDataService {
  private _currentData: any = {}

  private _getHigherLevelObject(path: string, obj: any) {
    let variableNames = path.split('.')
    let data = obj
    while (variableNames.length - 1) {
      const name = variableNames.shift() as string
      if (!(name in data)) {
        data[name] = {}
      }
      data = data[name]
    }
    return { higherLevelObject: data, fieldName: variableNames[0] }
  }

  private _addValueToField(value: any, field: string, obj: any, addToArray?: boolean) {
    if (addToArray) {
      if (!obj[field]) {
        obj[field] = []
      }
      obj[field].push(value)
    } else {
      obj[field] = value
    }
  }

  public get currentData() {
    return this._currentData
  }

  public setDefaults(defaults: any) {
    this._currentData = defaults
  }

  public addField(value: any, path: string, addToArray?: boolean) {
    const { higherLevelObject, fieldName } = this._getHigherLevelObject(path, this._currentData)
    this._addValueToField(value, fieldName, higherLevelObject, addToArray)
  }

  public addFieldToArrayItem(
    pathToArray: string,
    pathToItemValue: string,
    value: any,
    index: number,
    addToArray?: boolean,
  ) {
    const { higherLevelObject: arrayHigherLevelObject, fieldName: arrayFieldName } = this._getHigherLevelObject(
      pathToArray,
      this._currentData,
    )

    let arrayItem = this._currentData
    if (!arrayHigherLevelObject[arrayFieldName] || arrayHigherLevelObject[arrayFieldName].length === 0) {
      arrayHigherLevelObject[arrayFieldName] = []
      arrayHigherLevelObject[arrayFieldName].push({})
      arrayItem = arrayHigherLevelObject[arrayFieldName][0]
    } else {
      if (!arrayHigherLevelObject[arrayFieldName][index]) {
        arrayHigherLevelObject[arrayFieldName][index] = {}
      }
      arrayItem = arrayHigherLevelObject[arrayFieldName][index]
    }

    const { higherLevelObject: itemHigherLevelObject, fieldName: itemFieldName } = this._getHigherLevelObject(
      pathToItemValue,
      arrayItem,
    )

    this._addValueToField(value, itemFieldName, itemHigherLevelObject, addToArray)
  }
}

export const MaterialDataServiceId = Symbol('MaterialDataService')
