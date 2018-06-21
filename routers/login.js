var express = require('express'),
    router = express.Router();
var authUser = require('./users').authUser

router.get('/', (req, res) => {
    console.log(req.session)
    //req.session.isAuthorized = true
    res.redirect('back');
})

router.post('/', (req, res) => {
    req.session.isAuthorized = authUser(req.body)
    if (req.session.isAuthorized) res.json({ status: true })
    else res.json({ status: false })
})

module.exports = router