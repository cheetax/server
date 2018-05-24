var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var cors = require('cors')

var users = require('./routers/users')
var login = require('./routers/login')

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
    secret: 'dsvsdvsdvdsvd',
    resave: false,
    saveUninitialized: true,
    cookie: {
        name: 'react',
        secret: 'dsvsdvsdvdsvd',
        httpOnly: true
    }
}))

var corsOptions = {
    origin: (origin, callback) => {
        callback(null, origin)
    },
    credentials: true,

}

app.use(cors(corsOptions));

app.use('/users', users)
app.use('/login', login)

app.listen(3001, () => {
    console.log('OK! Server started')
})
