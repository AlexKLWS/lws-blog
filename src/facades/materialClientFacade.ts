import { useEffect, useRef, useState } from 'react'
import { Subscription } from 'rxjs/internal/Subscription'

import { useInjection } from 'services/provider'
import { MaterialClientServiceId, IMaterialClientService } from 'services/materialClient'
import { Article, ExtMaterial, Guide } from 'types/materials'

export const useArticleClient = () => {
  const service = useRef(useInjection<IMaterialClientService<Article>>(MaterialClientServiceId))

  const postArticle = (article: Article, referenceId?: string) => {
    service.current.postArticle(article, referenceId)
  }

  const fetchArticle = (id: string) => {
    service.current.fetchArticle(id)
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

  return { article, postArticle, fetchArticle }
}

export const useGuideClient = () => {
  const service = useRef(useInjection<IMaterialClientService<Guide>>(MaterialClientServiceId))

  const postGuide = (guide: Guide, referenceId?: string) => {
    service.current.postGuide(guide, referenceId)
  }

  const fetchGuide = (id: string) => {
    service.current.fetchGuide(id)
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

  return { guide, postGuide, fetchGuide }
}

export const useExtMaterialClient = () => {
  const service = useRef(useInjection<IMaterialClientService<ExtMaterial>>(MaterialClientServiceId))

  const postExtMaterial = (extMaterial: ExtMaterial, referenceId?: string) => {
    service.current.postExtMaterial(extMaterial, referenceId)
  }

  const fetchExtMaterial = (id: string) => {
    service.current.fetchExtMaterial(id)
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

  return { extMaterial, postExtMaterial, fetchExtMaterial }
}
