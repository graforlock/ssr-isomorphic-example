const html = require('bel')
const repoList = require('./repoList')

const app = ({data = [], pages = []} = {}) => {
  return html`
    <body>
      <main>${repoList(data)}</main>
      <section>
        ${pages.map(({ number, url }) =>
          html`<a href=${url}>${number}</a>`
        )}
      </section>
    </body>`
}

module.exports = app
