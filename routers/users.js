var express = require('express'),
    router = express.Router();

var users = [
    {
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

// var users = [    
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Ivan' }
// ]

router.post('/', (req, res) => {
    console.log(req.session)
    if (req.session.isAuthorized) res.json(users)
    else res.json({ status: false })
})

module.exports = router