import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import HomeView from '../../Home/HomeView'
import routes from 'consts/routes'
import { useMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'
import { page } from 'consts/query'
import { PreviewMaterial } from 'types/materials'
import Dropdown from 'components/Dropdowns/Dropdown/Dropdown'

const HomeController: React.FC = () => {
  const location = useLocation()
  const history = useHistory()

  const { materialPreviews, pagesCount, fetchMaterialPreviews } = useMaterialPreviewsProvider(true)
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
      return `${routes.secret.pageEditor}/${previewMaterial.referenceId}`
    } else if (previewMaterial.isGuideMaterial) {
      return `${routes.secret.guideEditor}/${previewMaterial.referenceId}`
    } else {
      return `${routes.secret.editor}/${previewMaterial.referenceId}`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <>
      <div style={{ paddingBottom: '40px' }}>
        <Dropdown dropdownTriggerText={'Add'} items={dropdownItems} />
      </div>
      <HomeView
        materialPreviews={materialPreviews}
        getDifferentPageLink={getDifferentPageLink}
        currentPage={currentPage}
        pagesCount={pagesCount}
        getPreviewItemLink={getPreviewItemLink}
      />
    </>
  )
}

export default HomeController
