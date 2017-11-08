const html = require('bel')

function issuesList (issues) {
  return html`
    <ul>
      ${issues.map(({ title, html_url: url }) =>
        html`<li><a href=${url}>${title}</a></li>`
      )}
    </ul>
  `
}

module.exports = issuesList
