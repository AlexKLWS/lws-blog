export const constructArrayItemPath = (pathToArray: string, pathToItemValue: string, index: number) => {
  return `${pathToArray}[${index}]${pathToItemValue}`
}
