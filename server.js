const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
// cookies and session storage
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
// morgan is the logger / debugger
const logger = require('morgan')
// connects to our mongo db database
const connectDB = require('./config/database')
// links to our routes
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')

// tell express to use the environment variables 
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

// connect to our database
connectDB()

// sets view engine to ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
// look at requests that are coming through and pull the stuff we need out of the request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// setting up morgan to run and log everything
app.use(logger('dev'))
// Sessions 
// lets our app use the session
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
// use passport for auth
app.use(passport.initialize())
// using sessions along with passport as well
app.use(passport.session())

app.use(flash())
 
// 2 lines below handle request that came into the server from the client
// main route is login, homepage, etc.
app.use('/', mainRoutes)
// after login on todos route
app.use('/posts', postRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    