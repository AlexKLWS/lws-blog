const home = '/'
const miscArticle = '/:id'
const life = '/life'
const lifeArticle = '/life/:id'
const code = '/code'
const codeArticle = '/code/:id'
const guides = '/guides'
const guidesArticle = '/guides/:id'
const projects = '/projects'
const projectsArticle = '/projects/:id'
const contact = '/contact'
const login = '/login'
const secret = {
  home: '/secret',
  editor: '/secret/editor',
  editorMaterial: '/secret/editor/:id',
  pageEditor: '/secret/pageEditor',
  pageEditorExistingMaterial: '/secret/pageEditor/:id',
  fileUpload: '/secret/file-upload',
}

export default {
  home,
  miscArticle,
  life,
  lifeArticle,
  code,
  codeArticle,
  guides,
  guidesArticle,
  projects,
  projectsArticle,
  contact,
  login,
  secret,
}
