const html = require('bel')
const morph = require('nanomorph')

const api = require('../../services/api')
const issueList = require('../issueList')

const repoList = (repos, start) => {
  return html`
    <ol start="${start + 1}">
      ${repos.map(repo =>
        html`
          <li>
            <h3 style="cursor: pointer" 
                onclick=${(e) => fetchIssues(e, repo)}>${repo.name}</h3>
            <ul></ul>
          </li>`
      )}
    </ol>`

  async function fetchIssues (e, { name }) {
    const ul = morph(
      e.target.nextElementSibling,
      html`<ul><li>Loading...</li></ul>`
    )
    try {
      const result = await api.fetchIssues(name)
      const issues = await result.json()
      morph(ul, issueList(issues))
    } catch (err) {
      console.error(err)
      morph(ul, html`<ul><li>Oops, something went wrong...</li></ul>`)
    }
  }
}

module.exports = repoList
