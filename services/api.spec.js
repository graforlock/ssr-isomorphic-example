const describe = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const callback = sinon.stub().returns({
  json: () => ({})
})

proxyquire('./api', { 'isomorphic-fetch': callback })

const api = require('./api')

describe('api.fetchIssues service gets called with proper arguments', t => {
  t.plan(2)

  api.fetchIssues('blahblah')

  t.assert(callback.calledOnce)
  t.equal(callback.getCall(0).args[0], 'https://api.github.com/repos/nodejs/blahblah/issues?state=open')
})

describe('api.fetchRepos service gets called with proper arguments', t => {
  t.plan(2)

  api.fetchRepos(1, 12)

  t.assert(callback.calledTwice)
  t.equal(callback.getCall(1).args[0], 'https://api.github.com/orgs/nodejs/repos?page=1&per_page=12')
})
