const html = require('bel')
const repoList = require('./repoList')

const app = ({data = [], pages = [], start = 0} = {}) => {
  return html`
    <body>
      <main>${repoList(data, start)}</main>
      <section>
        ${pages.map(({ number, url }) => {
          return number === (start + 1)
            ? html`<p>${number}</p>`
            : html`<a href=${url}>${number}</a>`
        }
      )}
      </section>
    </body>`
}

module.exports = app
