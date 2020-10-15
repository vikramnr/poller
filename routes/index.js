/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const Poll = require('../models/poll')

/* GET home page. */
router.get('/', async (_req, res, _next) => {
  let polls = await Poll.find({})
  let activePolls = polls.filter((p) => p.isActive === true).length
  let votes = polls
    .map((p) => p.votes.map((v) => Object.values(v)))
    .map((v) => [].concat(...v).reduce((a, r) => a + r, 0))
    .reduce((a, r) => a + r, 0)
  res.render('index', { polls: polls.length, activePolls, votes })
})

module.exports = router
