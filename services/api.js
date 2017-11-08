const fetch = require('isomorphic-fetch')

exports.fetchRepos = (page, limit) => {
  return fetch(`https://api.github.com/orgs/nodejs/repos?page=${page}&per_page=${limit}`)
}

exports.fetchIssues = name => {
  return fetch(`https://api.github.com/repos/nodejs/${name}/issues?state=open`)
}
