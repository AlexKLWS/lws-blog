import React from 'react'
import { Helmet } from 'react-helmet'
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
        <Helmet>
          <title>LWS - Secret</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <SecretHome />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.pageEditorExistingMaterial}>
        <Helmet>
          <title>LWS - Page Editor</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <ExtMaterialEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.pageEditor}>
        <Helmet>
          <title>LWS - Page Editor</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <ExtMaterialEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.guideEditorExistingMaterial}>
        <Helmet>
          <title>LWS - Guide Editor</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <GuideEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.guideEditor}>
        <Helmet>
          <title>LWS - Guide Editor</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <GuideEditor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.fileUpload}>
        <Helmet>
          <title>LWS - File Upload</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <FileUpload />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.editorMaterial}>
        <Helmet>
          <title>LWS - Article Editor</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <Editor />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.editor}>
        <Helmet>
          <title>LWS - Article Editor</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <Editor />
        </DefaultLayoutWrapper>
      </Route>
    </Switch>
  )
}

export default SecretRouter
