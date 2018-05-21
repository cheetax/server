var express = require('express'),
router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.user)
    if (req.session.login) res.json({status: 'User login OK!'})
    else res.json({status: 'User NOT login!'})
})

module.exports = router