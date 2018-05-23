var express = require('express'),
router = express.Router();

router.post('/', (req, res) => {
    console.log(req.session)
   // res.header('Access-Control-Allow-Origin', 'http://localhost:3001/users');
    // res.header({
    //     'Content-Type': "application/json",
    // }) 
    //res.header('Access-Control-Allow-Origin','http://localhost:3000/');
    var json = JSON.stringify({ status: 'User NOT login!' })
    res.status(200).json({ status: 'User NOT login!' })
})

module.exports = router