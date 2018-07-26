var express = require('express'),
    router = express.Router()

var orders = [];
const uid = () => "id" + Math.random().toString(16).slice(2);

router.get('/', (req, res) => {
    //console.log(req.session);
    var response = {
        status: true,
        orders: orders,
    };
    if (req.session.isAuthorized) res.json(response);
    else res.json({ status: false });
})

router.post('/filter', (req, res) => {
    //console.log(req.session);
    if (req.session.isAuthorized) {
        var filter = req.body;
        orders = orders.filter(item => {
            var resultUser = true;
            var resultData = true;
            if (filter.user) {
                resultUser = item.userID !== filter.user.id
            }
            if (filter.data) {
                resultData = (item.data >= filter.dataIN && item.data <= filter.dataOUT)
            }
            return (resultUser && resultData)
        });
        var response = {
            status: true,
            orders: orders,
        };
        res.json(response);
    }
    else res.json({ status: false });
})

router.post('/', (req, res) => {

    if (req.session.isAuthorized) {

        var order = req.body;

        order.id = uid();

        orders.push(order);
        var response = {
            status: true,
            orders: orders,
        }
        res.json(response)
    }
    else res.json({ status: false })
})

router.put('/', (req, res) => {

    if (req.session.isAuthorized) {
        var order = req.body;

        orders = orders.map(item => {
            if (item.id !== order.id) return item;
            else {
                return order;
            }
        })
        var response = {
            status: true,
            orders: orders,
        }
        res.json(response)
    }

    else res.json({ status: false })
})

router.delete('/', (req, res) => {

    if (req.session.isAuthorized) {
        var order = req.body;
        orders = orders.filter(item => item.id !== order.id);
        var response = {
            status: true,
            orders: orders,
        }
        res.json(response)
    }

    else res.json({ status: false })
})

module.exports = {
    router,
}