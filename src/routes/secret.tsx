import React from 'react'
import { Switch, Route } from 'react-router-dom'

import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import routes from 'consts/routes'
import GuideEditor from 'pages/Secret/GuideEditor'
import SecretHome from 'pages/Secret/Home'
import FileUpload from 'pages/Secret/FileUpload'
import ExtMaterialEditor from 'pages/Secret/ExtMaterialEditor'
import Editor from 'pages/Secret/Editor'

const SecretRouter = () => {
  return (
    <Switch>
      <Route exact path={routes.secret.home}>
        <DefaultLayoutWrapper>
          <SecretHome />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.pageEditorExistingMaterial}>
        <DefaultLayoutWrapper>
          <ExtMaterialEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.pageEditor}>
        <DefaultLayoutWrapper>
          <ExtMaterialEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.guideEditorExistingMaterial}>
        <DefaultLayoutWrapper>
          <GuideEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.guideEditor}>
        <DefaultLayoutWrapper>
          <GuideEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.fileUpload}>
        <DefaultLayoutWrapper>
          <FileUpload />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.editorMaterial}>
        <DefaultLayoutWrapper>
          <Editor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.editor}>
        <DefaultLayoutWrapper>
          <Editor />
        </DefaultLayoutWrapper>
      </Route>
    </Switch>
  )
}

export default SecretRouter
