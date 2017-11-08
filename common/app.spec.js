const describe = require('tape')
const bel = require('bel')
const minify = require('html-minifier').minify
const minifyConfig = {
  collapseWhitespace: true
}

const app = require('./app')

describe('doesn\'t fail without any input arguments', t => {
  t.plan(1)

  t.doesNotThrow(app)
})

describe('doesn\'t fail without any input arguments', t => {
  t.plan(1)

  const html = app()

  const expectedHtml = bel`
    <body>
      <main><ol start="1"></ol></main>
      <section></section>
    </body>
  `
  t.equal(minify(html.toString(), minifyConfig), minify(expectedHtml.toString(), minifyConfig))
})
