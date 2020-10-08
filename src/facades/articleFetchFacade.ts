import React, { useRef, useState, useEffect } from 'react'
import { IArticleFetchService, ArticleFetchServiceId } from 'services/articleFetch'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { Article } from 'types/materials'

export const useArticleProvider = () => {
  const service = useRef(useInjection<IArticleFetchService>(ArticleFetchServiceId))

  const fetchArticle = (id: string) => {
    service.current.fetchArticle(id)
  }

  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.article.subscribe((a) => {
        setArticle(a)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { article, fetchArticle }
}
