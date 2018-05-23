var express = require('express'),
router = express.Router();

router.post('/', (req, res) => {
    console.log(req.session)
    if (req.session.isAuthorized) res.json([{ name: 'Dmitriy' }, {name: 'Ivan'}])
    else res.json({ status: 'User NOT login!' })
})

module.exports = router