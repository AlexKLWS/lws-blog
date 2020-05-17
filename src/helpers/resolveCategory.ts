import { Category } from 'types/materials'

export const resolveCategoryFromPathname = (location: Location) => {
  const path = location.pathname.slice(1, location.pathname.length)
  switch (path) {
    case 'code':
      return Category.Code
    case 'life':
      return Category.Life
    case 'projects':
      return Category.Projects
    case 'guides':
      return Category.Guides
    default:
      return Category.Misc
  }
}
