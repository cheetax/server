var express = require('express'),
    router = express.Router();

var roles = {
    administrator: 'Администратор',
    customer:  'Заказчик',
    stockman: 'Кладовщик',
}

router.get('/', (req, res) => {
    console.log(req.session);
    var response = {
        status: true,
        roles: roles,
    };
    if (req.session.isAuthorized) res.json(response);
    else res.json({ status: false });
})

module.exports = router