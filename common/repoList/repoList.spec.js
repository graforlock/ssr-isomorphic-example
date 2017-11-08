const describe = require('tape')
const bel = require('bel')
const minify = require('html-minifier').minify
const minifyConfig = {
  collapseWhitespace: true
}

const repoList = require('./')

describe('renders a correct list html output', t => {
  t.plan(1)

  const html = repoList([
    { name: 'repo-a' },
    { name: 'repo-b' }
  ], 0)

  const expectedHtml = bel`
    <ol start="1">
      <li>
        <h3 style="cursor: pointer" onclick="">repo-a</h3>
        <ul></ul>
      </li>
      <li>
        <h3 style="cursor: pointer" onclick="">repo-b</h3>
        <ul></ul>
      </li>
    </ol>`

  t.equal(minify(html.toString(), minifyConfig), minify(expectedHtml.toString(), minifyConfig))
})
