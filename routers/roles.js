var express = require('express'),
    router = express.Router();

var rolesID = {
    administrator: 'administrator' ,
    customer: 'customer' ,
    stockman: 'stockman'
}    
var roles = {
    administrator: {
        id: rolesID.administrator,
        name: 'Администратор'
    },
    customer: {
        id: rolesID.customer,
        name: 'Заказчик'
    },
    stockman: {
        id: rolesID.stockman,
        name: 'Кладовщик'
    },
}

router.get('/', (req, res) => {
    //console.log(req.session);
    var response = {
        status: true,
        roles: roles,
    };
    if (req.session.isAuthorized) res.json(response);
    else res.json({ status: false });
})

module.exports = {
    router,
    roles
};