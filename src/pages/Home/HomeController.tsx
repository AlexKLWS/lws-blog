import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import HomeView from './HomeView'
import { useMaterialsProvider } from 'facades/materialsFetchFacade'
import { page } from 'consts/query'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'

const HomeController: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { materialPreviews, pagesCount, fetchMaterialPreviews } = useMaterialsProvider()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const category = resolveCategoryFromPathname(props.location as any)
    const pageFromQuery = new URLSearchParams(props.location?.search).get(page) || 1
    fetchMaterialPreviews(category, pageFromQuery)
    if (pageFromQuery != currentPage) {
      setCurrentPage(pageFromQuery as number)
    }
  }, [props.location])

  const navigateToNextPage = () => {
    let newPage = currentPage + 1
    if (newPage > pagesCount) {
      newPage = pagesCount
    }
    props.history.push(`${props.location.pathname}?${page}=${newPage}`)
    setCurrentPage(newPage)
  }

  const navigateToPrevPage = () => {
    let newPage = currentPage - 1
    if (newPage < 1) {
      newPage = 1
    }
    props.history.push(`${props.location.pathname}?${page}=${newPage}`)
    setCurrentPage(newPage)
  }

  console.log('MATERIALS: ', materialPreviews)

  return (
    <HomeView
      materialPreviews={materialPreviews}
      navigateToPrevPage={navigateToPrevPage}
      navigateToNextPage={navigateToNextPage}
      currentPage={currentPage}
      pagesCount={pagesCount}
    />
  )
}

export default HomeController
