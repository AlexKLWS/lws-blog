import React from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>{article?.name}</title>
        <meta name='description' content={article?.subtitle} />
      </Helmet>
      {transitions.map(({ item, key, props }) =>
        !item ? (
          <animated.div key={key} style={{ ...props, padding: '20px 42px', position: 'absolute', right: 0, left: 0 }}>
            <div className={'ArticleTitleContainer'}>
              <div className={'ArticleTitleSkeletonLoader'} />
              <div className={'ArticleSubtitleSkeletonLoader'} />
            </div>
            <div className={'ArticleTextSkeletonLoader'} />
          </animated.div>
        ) : (
          <animated.div key={key} style={{ ...props, padding: '20px 42px', minHeight: '720px', position: 'relative' }}>
            <div className={'ArticleTitleContainer'}>
              <h1 className={'ArticleTitle'}>{article?.name}</h1>
              <h2 className={'ArticleSubtitle'}>{article?.subtitle}</h2>
            </div>
            <LoadableArticleTextView text={article!.articleText} />
            <p className={'ArticleDate'}>{formattedDate}</p>
          </animated.div>
        ),
      )}
    </div>
  )
}
