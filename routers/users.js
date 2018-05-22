var express = require('express'),
router = express.Router();

router.post('/', (req, res) => {
    console.log(req.session)
    //)
    //if (req.session.login) res.json({status: 'User login OK!'})
    //else res.json({status: 'User NOT login!'})
    res.json({status: 'User NOT login!'})
})

module.exports = router