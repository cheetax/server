var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var users = require('./routers/users')
var login = require('./routers/login')

var app = express();

app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/users', users)
app.use('/login', login)

app.listen(3001, () => {
    console.log('OK! Server started')
})
