const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main'
})

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


// setup connect-flash
app.use(flash())

// import passport config


// static files
app.use(express.static('public'))

// route setting
app.use('/', require('./routers/home'))
app.use('/users', require('./routers/user'))
// setup listening on Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})