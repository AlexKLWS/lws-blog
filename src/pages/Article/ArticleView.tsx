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
    return <div style={{ backgroundColor: 'rgba(240, 240, 240, 1)', height: '600px', marginTop: '18px' }} />
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
              <div style={{ backgroundColor: 'rgba(240, 240, 240, 1)', height: '36px', width: '45ex' }} />
              <div
                style={{
                  backgroundColor: 'rgba(240, 240, 240, 1)',
                  margin: '20px 0px',
                  height: '18px',
                  width: '40ex',
                }}
              />
            </div>
            <div style={{ backgroundColor: 'rgba(240, 240, 240, 1)', height: '600px', marginTop: '18px' }} />
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
