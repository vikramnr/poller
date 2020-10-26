// if(env==='DEV'){

// }
require('dotenv').config()
/* eslint-disable no-unused-vars */
const createError = require('http-errors')
const express = require('express')
const methodOverride = require('method-override')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const expressSession = require('express-session')
const flash = require('connect-flash')

const User = require('./models/user')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const pollRouter = require('./routes/poll')

const app = express()
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser:true,useUnifiedTopology: true}).then((c) => console.log('connect')).catch(e => console.log(e))
// view engine setup
app.use(cookieParser('secretString'))
app.use(expressSession(({
	secret: 've$@^ry$@^long$@^st&*#!@**rin26&*#!@**26gwi91th@187',
	resave: false,
	saveUninitialized: false,
})))
app.use(flash())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(function(req, res, next){
	res.locals.currentUser = req.user
	res.locals.success = req.flash('success')
	next()
})
  

passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

  
app.use('/', indexRouter)
app.use('/user',usersRouter)
app.use('/poll', pollRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})
// error handler
app.use(function(err, req, res, _next) {
	// set locals, only providing error in development
	console.log(err)
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
