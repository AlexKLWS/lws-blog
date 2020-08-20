import { injectable } from 'inversify'
import { Subject } from 'rxjs'
import get from 'lodash/get'

import { constructArrayItemPath } from 'helpers/constructArrayItemPath'
import {
  MaterialDataObjectVerifier,
  EditorError,
  MaterialDataPropertyVerifier,
  VerifiedPropertyType,
} from 'types/verifier'

export interface IMaterialDataService {
  currentData: any
  setup: (verifier: MaterialDataObjectVerifier, defaultData?: any) => void
  updateData: (newData: any) => void
  getSubjectFor: (path: string) => Subject<any>
  getValueFor: (path: string) => any
  getArrayItemSubjectFor: (pathToArray: string, pathToItemValue: string, index: number) => Subject<any>
  getArrayItemValueFor: (pathToArray: string, pathToItemValue: string, index: number) => any
  addField: (path: string, value: any, isArray?: boolean) => void
  addFieldToArrayItem: (
    pathToArray: string,
    pathToItemValue: string,
    value: any,
    index: number,
    addToArray?: boolean,
  ) => void
  addArrayItem: (pathToArray: string, item?: any) => void
  removeArrayItem: (pathToArray: string, index: number) => void
  verifyData: () => EditorError[]
}

@injectable()
export class MaterialDataService implements IMaterialDataService {
  private _currentData: any = {}
  private _verifier: MaterialDataObjectVerifier = {}
  private _subjects: { [path: string]: Subject<any> } = {}

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

  private _updateAllSubjectsWithCurrentData() {
    for (const path in this._subjects) {
      const newValue = get(this._currentData, path)
      this._subjects[path].next(newValue)
    }
  }

  public setup(verifier: MaterialDataObjectVerifier, defaultData?: any) {
    this._verifier = verifier
    this._currentData = defaultData || {}
    console.log('CURRENT-DATA: ', this._currentData)
    console.log('VERIFIER: ', this._verifier)
  }

  public get currentData() {
    return this._currentData
  }

  public updateData(newData: any) {
    this._currentData = newData
    this._updateAllSubjectsWithCurrentData()
  }

  public getSubjectFor(path: string) {
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    return this._subjects[path]
  }

  public getValueFor(path: string) {
    return get(this._currentData, path)
  }

  public getArrayItemSubjectFor(pathToArray: string, pathToItemValue: string, index: number) {
    const path = constructArrayItemPath(pathToArray, pathToItemValue, index)
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    return this._subjects[path]
  }

  public getArrayItemValueFor(pathToArray: string, pathToItemValue: string, index: number) {
    const path = constructArrayItemPath(pathToArray, pathToItemValue, index)
    return get(this._currentData, path)
  }

  public addField(path: string, value: any, addToArray?: boolean) {
    const { higherLevelObject, fieldName } = this._getHigherLevelObject(path, this._currentData)
    this._addValueToField(value, fieldName, higherLevelObject, addToArray)
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    this._subjects[path].next(value)
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
    const path = constructArrayItemPath(pathToArray, pathToItemValue, index)
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    this._subjects[path].next(value)
  }

  public addArrayItem(pathToArray: string, item: any = {}) {
    if (!this._currentData[pathToArray]) {
      this._currentData[pathToArray] = []
    }
    this._currentData[pathToArray].push(item)
  }

  public removeArrayItem(pathToArray: string, index: number) {
    if (!this._currentData[pathToArray] || this._currentData[pathToArray].length <= index) {
      return
    }
    this._currentData[pathToArray].splice(index, 1)
    this._updateAllSubjectsWithCurrentData()
  }

  private _verifyObject(data: any, mapVerifier: MaterialDataObjectVerifier, errors: EditorError[]) {
    for (const key in mapVerifier) {
      this._verifyProperty(data[key], mapVerifier[key], errors)
    }
  }

  private _verifyProperty(data: any, propertyVerifier: MaterialDataPropertyVerifier, errors: EditorError[]) {
    if (!data) {
      errors.push(propertyVerifier.error)
    } else {
      if (propertyVerifier.type === VerifiedPropertyType.OBJECT) {
        this._verifyObject(data, propertyVerifier.innerObject!, errors)
      } else if (propertyVerifier.type === VerifiedPropertyType.OBJECTARRAY) {
        for (const index in data) {
          this._verifyObject(data[index], propertyVerifier.innerObject!, errors)
        }
      } else if (propertyVerifier.type === VerifiedPropertyType.ARRAY) {
        for (const index in data) {
          this._verifyProperty(data[index], propertyVerifier.innerProperty!, errors)
        }
      }
    }
  }

  public verifyData() {
    const errors: EditorError[] = []
    console.log('CURRENT-DATA: ', this._currentData)
    console.log('VERIFIER: ', this._verifier)
    this._verifyObject(this._currentData, this._verifier, errors)
    return errors
  }
}

export const MaterialDataServiceId = Symbol('MaterialDataService')
