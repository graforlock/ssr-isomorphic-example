const describe = require('tape')
const bel = require('bel')
const minify = require('html-minifier').minify
const minifyConfig = {
  collapseWhitespace: true
}

const issueList = require('./')

describe('renders a correct issue list html output', t => {
  const html = issueList([
    {
      title: 'Issue title #1',
      html_url: 'http://url-to-the-issue/1'
    }
  ])

  const expectedHtml = bel`
    <ul>
      <li><a href="http://url-to-the-issue/1">Issue title #1</a></li>
    </ul>`

  t.equal(minify(html.toString(), minifyConfig), minify(expectedHtml.toString(), minifyConfig))
  t.end()
})
