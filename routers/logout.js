var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    //console.log(req.session)
    req.session.isAuthorized = false;
    res.json({ status: req.session.isAuthorized, user: null });
})

module.exports = router