var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var cors = require('cors')

var users = require('./routers/users')
var login = require('./routers/login')

var app = express();



//app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cookieSession({name: 'react', keys: 'kdfbidfbvierv'}))
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
// app.use('*', (req, res, next) => {
//     console.log(res)
//     next();
// })
var corsOptions = {
    origin: 'http://localhost:3001/users',
    //origin: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
  
app.use(cors(corsOptions));

app.use('/users', cors(corsOptions), users)
app.use('/login', login)

app.listen(3001, () => {
    console.log('OK! Server started')
})
