const morph = require('nanomorph')
const app = require('../common/app')

morph(document.body, app(window.__INITIAL_STATE__))
