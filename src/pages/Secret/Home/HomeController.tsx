import React, { useMemo, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import HomeView from './HomeView'
import routes from 'consts/routes'
import { useMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'
import { page } from 'consts/query'
import { PreviewMaterial } from 'types/materials'

const HomeController: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { materialPreviews, pagesCount, fetchMaterialPreviews } = useMaterialPreviewsProvider()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const category = resolveCategoryFromPathname(props.location as any)
    const pageFromQuery = new URLSearchParams(props.location?.search).get(page) || 1
    fetchMaterialPreviews(category, pageFromQuery)
    if (pageFromQuery !== currentPage) {
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

  const onPreviewItemPress = (previewMaterial: PreviewMaterial) => {
    if (previewMaterial.pageURL) {
      props.history.push(`${routes.secret.pageEditor}/${previewMaterial.referenceId}`)
    } else {
      props.history.push(`${routes.secret.editor}/${previewMaterial.referenceId}`)
    }
  }
  const dropdownItems = useMemo(
    () => [
      {
        label: 'Add article',
        callback: () => {
          props.history.push(routes.secret.editor)
        },
      },
      {
        label: 'Add page',
        callback: () => {
          props.history.push(routes.secret.pageEditor)
        },
      },
      {
        label: 'Add files',
        callback: () => {
          props.history.push(routes.secret.fileUpload)
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
