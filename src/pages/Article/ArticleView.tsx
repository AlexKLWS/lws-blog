import React from 'react'
import Loadable from 'react-loadable'
import { useTransition, animated } from 'react-spring'
import { DateTime } from 'luxon'

import { Article } from 'types/materials'

import './Article.scss'

interface Props {
  article: Article | null
}

const LoadableArticleTextView = Loadable({
  loader: () => import('../../components/ArticleText/ArticleTextView'),
  loading: () => {
    return <div className={'ArticleTextSkeletonLoader'} />
  },
})

export const ArticleView: React.FC<Props> = ({ article }: Props) => {
  const transitions = useTransition(!!article, null, {
    config: { tension: 280, friction: 90 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const formattedDate = !!article && DateTime.fromISO(article.createdAt!).toLocaleString(DateTime.DATE_SHORT)

  return (
    <div className={'ArticleContainer'}>
      {transitions.map(({ item, key, props }) =>
        !item ? (
          <animated.div style={{ ...props, padding: '20px 42px', position: 'absolute', right: 0, left: 0 }}>
            <div className={'ArticleTitleContainer'}>
              <div className={'ArticleTitleSkeletonLoader'} />
              <div className={'ArticleSubtitleSkeletonLoader'} />
            </div>
            <div className={'ArticleTextSkeletonLoader'} />
          </animated.div>
        ) : (
          <animated.div style={{ ...props, padding: '20px 42px', minHeight: '720px', position: 'relative' }}>
            <div className={'ArticleTitleContainer'}>
              <h1 className={'ArticleTitle'}>{article?.name}</h1>
              <h3 className={'ArticleSubtitle'}>{article?.subtitle}</h3>
            </div>
            <LoadableArticleTextView text={article!.articleText} />
            <p className={'ArticleDate'}>{formattedDate}</p>
          </animated.div>
        ),
      )}
    </div>
  )
}
