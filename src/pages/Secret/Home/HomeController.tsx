import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import HomeView from './HomeView'
import routes from 'consts/routes'
import { useMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'
import { page } from 'consts/query'
import { PreviewMaterial, Category } from 'types/materials'

const HomeController: React.FC = () => {
  const location = useLocation()
  const history = useHistory()

  const { materialPreviews, pagesCount, fetchMaterialPreviews } = useMaterialPreviewsProvider()
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
      history.push(`${routes.secret.pageEditor}/${previewMaterial.referenceId}`)
    } else if (previewMaterial.isGuideMaterial) {
      history.push(`${routes.secret.guideEditor}/${previewMaterial.referenceId}`)
    } else {
      history.push(`${routes.secret.editor}/${previewMaterial.referenceId}`)
    }
  }
  const dropdownItems = useMemo(
    () => [
      {
        label: 'Add article',
        callback: () => {
          history.push(routes.secret.editor)
        },
      },
      {
        label: 'Add guides',
        callback: () => {
          history.push(routes.secret.guideEditor)
        },
      },
      {
        label: 'Add page',
        callback: () => {
          history.push(routes.secret.pageEditor)
        },
      },
      {
        label: 'Add files',
        callback: () => {
          history.push(routes.secret.fileUpload)
        },
      },
    ],
    [],
  )

  return (
    <HomeView
      materialPreviews={materialPreviews}
      navigateToPrevPage={navigateToPrevPage}
      navigateToNextPage={navigateToNextPage}
      currentPage={currentPage}
      pagesCount={pagesCount}
      onPreviewItemPress={onPreviewItemPress}
      dropdownItems={dropdownItems}
    />
  )
}

export default HomeController
