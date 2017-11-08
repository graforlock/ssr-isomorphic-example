const express = require('express')
const router = express.Router()
const paginate = require('express-paginate')

const api = require('../services/api')
const asyncMiddleware = require('../middleware/async')

const app = require('../common/app')

/* GET home page. */
router.get('/', asyncMiddleware(async (req, res, next) => {
  const { page, limit } = req.query
  const response = await api.fetchRepos(page, limit)
  if (!response.ok) {
    const err = new Error(response.statusText)
    err.status = response.status
    throw err
  }

  // Note: This is how github advises to grab the total (in Docs).
  const [, last] = response.headers.get('Link').split(', ')
  const total = Number(last.match(/page=(\d+).*$/)[1])
  const pages = paginate.getArrayPages(req)(total, total, page)

  const data = await response.json()
  const initialState = { data, pages, page, limit }
  const html = app(initialState).toString()

  res.render('index', { html, initialState })
}))

module.exports = router
