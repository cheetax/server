var express = require('express'),
router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.user)
    if (!req.session.val) req.session.val = 0
    //window.postMessage({sender: 'iframeName'}, '*')
    //res.json({status: 'User OK!'})
    //res.cookie = req.session.cookie;
    //res.cookie()
    res.cookie('id', req.sessionID);
    //res.send('gfgfg')
    res.redirect('back');
})

module.exports = router