var express = require('express'),
    router = express.Router();

var users = [
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Dmitriy' },
    { name: 'Ivan' }
]

// var users = [    
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Ivan' }
// ]

router.post('/', (req, res) => {
    console.log(req.session)
    if (req.session.isAuthorized) res.json(users)
    else res.json({ status: false })
})

module.exports = router