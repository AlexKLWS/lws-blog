import React, { useState } from 'react'
import { RouteProps } from 'react-router-dom'

import EditorView from './EditorView'

const EditorController: React.FC<RouteProps> = (props: RouteProps) => {
  return <EditorView />
}

export default EditorController
