import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import './CodeRendererView.scss'

interface Props {
  language: any
  value: string
  children: React.ReactChildren
}

const CodeRenderView = (props: Props) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={props.value} language='jsx'>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={'CodeRendererPre'}>
          {tokens.map((line, i) => (
            <div className={'CodeRendererLine'} key={i} {...getLineProps({ line, key: i })}>
              <span className={'CodeRendererLineNo'}>{i + 1}</span>
              <span className={'CodeRendererLineContent'}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeRenderView
