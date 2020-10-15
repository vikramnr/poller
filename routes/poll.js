/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')
const Poll = require('../models/poll')
const { route } = require('.')
const poll = require('../models/poll')
// const { generateTokenForTwitch } = require('./middleware')

router.get('/create', async (req, res, _next) => {
  // render create page
  res.render('polls/create')
})

router.get('/', async (req, res, next) => {
  // main route for poll
  // show polls by latest created data
  let polls = await (await Poll.find({}).sort({ _id: -1 })).filter(p => p.isActive === true)
  res.render('polls/show', { polls })
})

router.post('/', async (req, res, _next) => {
  // get the required params and save it
  let { title, question, answer } = req.body
  let newPoll = new Poll({
    title: title,
    question: question,
    answers: answer,
  })
  await newPoll.save()
  res.redirect('/')
})

router.post('/:id', async (req, res, next) => {
  // get the id which has to be updated
  let id = req.params.id
  // get the key which has to updated
  let question = Object.keys(req.body)[0]
  // find the poll from db
  let poll = await Poll.findById({ _id: id })
  // create copy of votes array
  let votes = poll.votes || []
  // find the answer which has to updated
  let index = votes.findIndex((p) => p[question])
  if (index !== -1) {
    // update the answer and save to poll
    votes[index][question] += 1
    poll.votes = votes
    await Poll.findByIdAndUpdate({ _id: req.params.id }, poll)
  } else {
    // create a new object with initial value
    // and save it
    let obj = {}
    obj[question] = 1
    votes.push(obj)
    poll.votes = votes
    await poll.save()
  }
  res.redirect('/')
})

router.get('/:id', async (req, res, next) => {
  let poll = await Poll.findById(req.params.id)
  res.render('polls/stats', { poll })
})

router.put('/:id', async (req, res, next) => {
  let {answer} =req.body
  if(!answer) {
    res.redirect('/')
  }
  let poll = await Poll.findById(req.params.id)
  let existingAnswer = poll.answers.map(a => a.toLowerCase())
  let updatedAnswer = answer.filter(a => existingAnswer.index(a.toLowerCase())!==-1)
  
  poll.answers = poll.answers.concat(updatedAnswer)
  poll.save()
  res.redirect(`/poll/${req.params.id}`)
})

module.exports = router
