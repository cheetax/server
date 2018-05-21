var express = require('express'),
router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.user)
    if (!req.session.val) req.session.val = 0
    //window.postMessage({sender: 'iframeName'}, '*')
    //res.json({status: 'User OK!'})
    
    req.session.user = 'test user:' + req.session.val
    req.session.val += 1
    res.redirect('back');
})

module.exports = router