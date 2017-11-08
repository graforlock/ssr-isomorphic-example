const describe = require('tape')
const request = require('supertest')

const app = require('../app')

describe('index route returns 200', async t => {
  t.plan(1)
  const result = await request(app).get('/')

  t.equal(result.status, 200)
})
