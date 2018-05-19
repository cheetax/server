var express = require('express'),
router = express.Router();

router.get('/', (req, res) => {
    console.log(req)
    res.send('User OK!')
})

module.exports = router