import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import HomeView from './HomeView'
import { useMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'
import { page } from 'consts/query'
import { resolveCategoryFromPathname, getCategoryPathname } from 'helpers/resolveCategory'
import { Category, PreviewMaterial } from 'types/materials'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'

const HomeController: React.FC = () => {
  const location = useLocation()
  const history = useHistory()

  const { materialPreviews, pagesCount, fetchInProgress, fetchMaterialPreviews } = useMaterialPreviewsProvider()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const category = resolveCategoryFromPathname(location as any)
    const pageFromQuery = new URLSearchParams(location?.search).get(page) || 1
    fetchMaterialPreviews(category, pageFromQuery)
    if (pageFromQuery !== currentPage) {
      setCurrentPage(pageFromQuery as number)
    }
  }, [location])

  const navigateToNextPage = () => {
    let newPage = currentPage + 1
    if (newPage > pagesCount) {
      newPage = pagesCount
    }
    history.push(`${location.pathname}?${page}=${newPage}`)
    setCurrentPage(newPage)
  }

  const navigateToPrevPage = () => {
    let newPage = currentPage - 1
    if (newPage < 1) {
      newPage = 1
    }
    history.push(`${location.pathname}?${page}=${newPage}`)
    setCurrentPage(newPage)
  }

  const onPreviewItemPress = (previewMaterial: PreviewMaterial) => {
    if (previewMaterial.url) {
      history.push(previewMaterial.url)
    } else if (previewMaterial.categories.includes(Category.Guides)) {
      history.push(`/guides/${previewMaterial.referenceId}`)
    } else {
      history.push(`/articles/${previewMaterial.referenceId}`)
    }
  }

  if (!materialPreviews.length && !fetchInProgress) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  return (
    <HomeView
      materialPreviews={materialPreviews}
      navigateToPrevPage={navigateToPrevPage}
      navigateToNextPage={navigateToNextPage}
      currentPage={currentPage}
      pagesCount={pagesCount}
      onPreviewItemPress={onPreviewItemPress}
    />
  )
}

export default HomeController
