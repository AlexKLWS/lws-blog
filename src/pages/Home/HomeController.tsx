import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import HomeView from './HomeView'
import { useMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'
import { page } from 'consts/query'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'
import { PreviewMaterial } from 'types/materials'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'

const HomeController: React.FC = () => {
  const location = useLocation()

  const { materialPreviews, pagesCount, fetchInProgress, fetchMaterialPreviews } = useMaterialPreviewsProvider()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    const category = resolveCategoryFromPathname(location as any)
    const pageFromQuery = new URLSearchParams(location?.search).get(page) || 1
    fetchMaterialPreviews(category, pageFromQuery)
    if (pageFromQuery !== currentPage) {
      setCurrentPage(pageFromQuery as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const getDifferentPageLink = (next?: boolean) => {
    let newPage = currentPage
    if (next) {
      newPage = currentPage + 1
      if (newPage > pagesCount) {
        newPage = pagesCount
      }
    } else {
      newPage = currentPage - 1
      if (newPage < 1) {
        newPage = 1
      }
    }
    return `${location.pathname}?${page}=${newPage}`
  }

  const getPreviewItemLink = (previewMaterial: PreviewMaterial) => {
    if (previewMaterial.url) {
      return previewMaterial.url
    } else if (previewMaterial.isGuideMaterial) {
      return `/guides/${previewMaterial.referenceId}`
    } else {
      return `/articles/${previewMaterial.referenceId}`
    }
  }

  if (!materialPreviews.length && !fetchInProgress) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  return (
    <HomeView
      materialPreviews={materialPreviews}
      getDifferentPageLink={getDifferentPageLink}
      currentPage={currentPage}
      pagesCount={pagesCount}
      getPreviewItemLink={getPreviewItemLink}
    />
  )
}

export default HomeController
