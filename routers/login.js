var express = require('express'),
router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.user)
    req.session.isAuthorized = true
    res.redirect('back');
})

router.post('/', (req, res) => {
    if (req.session.isAuthorized) res.json({ status: true })
    else res.json({ status: false })
})

module.exports = router