import { useRef, useState, useEffect } from 'react'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { Article, ExtMaterial, Guide } from 'types/materials'
import { IMaterialFetchService, MaterialFetchServiceId } from 'services/materialFetch'
import { apiEndpoint } from 'consts/endpoints'

export const useGuideProvider = () => {
  const service = useRef(useInjection<IMaterialFetchService<Guide>>(MaterialFetchServiceId))

  const fetchGuide = (id: string) => {
    service.current.fetchMaterialById(id, `${apiEndpoint}/guides`)
  }

  const [guide, setGuide] = useState<Guide | null>(null)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.material.subscribe((g) => {
        setGuide(g)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { guide, fetchGuide }
}

export const useArticleProvider = () => {
  const service = useRef(useInjection<IMaterialFetchService<Article>>(MaterialFetchServiceId))

  const fetchArticle = (id: string) => {
    service.current.fetchMaterialById(id, `${apiEndpoint}/articles`)
  }

  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.material.subscribe((g) => {
        setArticle(g)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { article, fetchArticle }
}

export const useExtMaterialProvider = () => {
  const service = useRef(useInjection<IMaterialFetchService<ExtMaterial>>(MaterialFetchServiceId))

  const fetchExtMaterial = (id: string) => {
    service.current.fetchMaterialById(id, `${apiEndpoint}/ext-materials`)
  }

  const [extMaterial, setExtMaterial] = useState<ExtMaterial | null>(null)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.material.subscribe((g) => {
        setExtMaterial(g)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { extMaterial, fetchExtMaterial }
}
