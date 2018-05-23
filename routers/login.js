var express = require('express'),
router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.user)
    req.session.isAuthorized = true
    res.redirect('back');
})

router.post('/', (req, res) => {
    if (req.session.isAuthorized) res.json({ status: 'User is login!' })
    else res.json({ status: 'User NOT login!' })
})

module.exports = router