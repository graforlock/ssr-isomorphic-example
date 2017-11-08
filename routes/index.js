const express = require('express')
const router = express.Router()

const api = require('../services/api')

const app = require('../common/app')

const paginate = require('express-paginate')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const response = await api.fetchRepos(req.query.page, req.query.limit)
    if (!response.ok) {
      const err = new Error(response.statusText)
      err.status = response.status
      throw err
    }

    const [, last] = response.headers.get('Link').split(', ')
    const total = Number(last.match(/page=(\d+).*$/)[1])
    const pages = paginate.getArrayPages(req)(total, total, req.query.page)

    const data = await response.json()
    const initialState = { data, pages }
    const html = app(initialState).toString()

    res.render('index', { html, initialState })
  } catch (err) {
    next(err)
  }
})

module.exports = router
