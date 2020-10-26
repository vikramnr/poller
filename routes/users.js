/* eslint-disable no-unused-vars */
const express = require('express')
var passport = require('passport')
const User = require('../models/user')
const router = express.Router()
const SALT_ROUNDS = 10

/* GET users login. */
router.get('/', async (req, res, next) => {
  res.render('user/login')
})

router.get('/logout',(req,res,next) => {
  req.logOut()
  req.flash('success', 'Logged out successfully')
  res.redirect('/')
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: 'user/login' }),
  function(req, res) {
    req.flash('success', 'Logged In successfully')
    res.redirect('/')
})


router.post('/', async (req, res, next) => {
  const { email, password } = req.body

  const foundUser = await User.findOne({ email: email })

  if(foundUser) {
    console.log('user already exists')
    req.flash('success', 'An user with this email already exists. Please try with different one.')
    return res.redirect('/')
  }

  User.register({username: email}, req.body.password,  (err, newUser) => {
    if (err) {
        console.log(err)
        req.flash('success', 'An error occured. Please try again after sometime')
        return res.redirect('/user')
    }
    else {
      req.flash('success', 'Your profile has been created. Please login to save your polls')
      res.redirect('/user')
    }
})


})

module.exports = router
