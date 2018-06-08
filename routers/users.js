var express = require('express'),
    router = express.Router();

const uid = () => "id" + Math.random().toString(16).slice(2);

var users = [
    {
        id: uid(),
        firstName: 'Дмитрий',
        surName: 'Гребенев',
        post: 'Начальник службы',
        email: 'dmitriy.grebenev@gmail.com',
        office: 'корпус 504 комната 248',
        phone: '52112',
        roles: [
            'Администратор',
            'Заказчик'
        ]
    },
    {
        id: uid(),
        firstName: 'Михаил',
        surName: 'Стариков',
        post: 'Ведущий специалист',
        email: 'mikhail.starikov@gmail.com',
        office: 'корпус 504 комната 248',
        phone: '52111',
        roles: [
            'Заказчик'
        ]
    },
]




var user = (i) => {
    var _id = uid();
    _user = {
        id: _id,
        firstName: 'Дмитрий',
        surName: 'Гребенев' + i,
        post: 'Начальник службы',
        email: 'dmitriy.grebenev@gmail.com',
        office: 'корпус 504 комната 248',
        phone: '52112',
        roles: [
            'Администратор',
            'Заказчик'
        ]
    }
    return _user;
}

var setUsers = () => {
    for (var i = 0; i <= 15000; i++) {
        users.push(user(i));
    }
    console.log(users)
};

setUsers();

// var users = [    
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Ivan' }
// ]

router.get('/', (req, res) => {
    console.log(req.session);
    var response = {
        status: true,
        users: users,
        newUser: {},
    };
    if (req.session.isAuthorized) res.json(response);
    else res.json({ status: false });
})

router.post('/', (req, res) => {

    if (req.session.isAuthorized) {
        var user = req.body;
        user.id = uid();
        users.push(user);
        var response = {
            status: true,
            users: users,
            newUser: user,
        }
        res.json(response)
    }

    else res.json({ status: false })
})

router.put('/', (req, res) => {

    if (req.session.isAuthorized) {
        var user = req.body;
        users = users.map(item => {
            if (item.id !== user.id) return item;
            else return user;
        })
        var response = {
            status: true,
            users: users,
            newUser: user,
        }
        res.json(response)
    }

    else res.json({ status: false })
})

router.delete('/', (req, res) => {

    if (req.session.isAuthorized) {
        var user = req.body;
        users = users.filter(item => item.id !== user.id);
        var response = {
            status: true,
            users: users,
            newUser: {},
        }
        res.json(response)
    }

    else res.json({ status: false })
})

module.exports = router