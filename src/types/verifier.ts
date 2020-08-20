export type MaterialDataObjectVerifier = { [key: string]: MaterialDataPropertyVerifier }

export type MaterialDataPropertyVerifier = {
  error: EditorError
  type: VerifiedPropertyType
  innerValue?: MaterialDataPropertyVerifier
  innerMap?: MaterialDataObjectVerifier
}

export type EditorError = {
  id: string
  description: string
}

export enum VerifiedPropertyType {
  PRIMITIVE = 0,
  OBJECT = 1,
  ARRAY = 2,
  OBJECTARRAY = 3,
}
