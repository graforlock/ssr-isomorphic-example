const html = require('bel')
const repoList = require('./repoList')

const app = ({data = [], pages = [], page = 1, limit = 12} = {}) => {
  const start = (page - 1) * limit
  return html`
    <body>
      <main>${repoList(data, start)}</main>
      <section>
        ${pages.map(({ number, url }) => {
          return number === page
            ? html`<span>${number}</span>`
            : html`<a href=${url}>${number}</a>`
        }
      )}
      </section>
    </body>`
}

module.exports = app
