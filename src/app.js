const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main'
})

// express-session and passport
const session = require('express-session')
const passport = require('passport')


// setup handlebars engine and file extension
app.engine(hbs.extname, hbs.engine, hbs.defaultLayout)
app.set('view engine', hbs.extname)

// import body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setup method-override
app.use(methodOverride('_method'))

// setup express-session
app.use(session({
  secret: 'secretKey from Mina',
  resave: false,
  saveUninitialized: true
}))


// setup passport
app.use(passport.initialize())
app.use(passport.session())

// setup connect-flash
app.use(flash())

// setup passport
require('../config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// static files
app.use(express.static('public'))

// route setting
app.use('/todos', require('./routers/todo'))
app.use('/', require('./routers/home'))
app.use('/users', require('./routers/user'))

// setup listening on Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})