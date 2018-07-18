var express = require('express'),
    router = express.Router();
var authUser = require('./users').authUser

router.get('/', (req, res) => {
    //console.log(req.session)
    //req.session.isAuthorized = true
    res.redirect('back');
})

router.post('/', (req, res) => {
    var user = null;
    if (!req.session.isAuthorized) {
        user = authUser(req.body);
        req.session.isAuthorized = user !== null;
        req.session.user = user;
    }
    res.json({ status: req.session.isAuthorized, user: req.session.user })
})


module.exports = router