var express = require('express'),
    router = express.Router(),
    roles = require('./roles').roles;
const crypto = require('crypto');
var pbkdf2 = require('pbkdf2')


const uid = () => "id" + Math.random().toString(16).slice(2);

var salts = [];
var users = [];

var authUser = (user) => {
    var findUsers = users.filter(item => item.email === user.login)
    if (findUsers.length > 0) {
        var findUser = findUsers[0];
        var _salts = salts.filter(itemSalt => itemSalt.id == findUser.id);
        if (_salts.length == 0) {
            return null;
        }
        else salt = _salts[0].salt;
        var password = pbkdf2.pbkdf2Sync(user.password, salt, 1000, 32, 'sha256').toString();
        if (findUser.password === password) return findUser;
        else return null;
    }
    else return null;
}

(() => {
    var _user = {};
    _user = {
        id: uid(),
        firstName: 'Дмитрий',
        surName: 'Гребенев',
        post: 'Начальник службы',
        email: 'dmitriy.grebenev@gmail.com',
        office: 'корпус 504 комната 248',
        phone: '52112',
        usePassword: true,
        password: '',
        salt: '',
        roles: [
            roles.administrator.id,
            roles.customer.id
        ]
    }
    var salt = crypto.randomBytes(32)
    salts.push({
        id: _user.id,
        salt: salt,
    })
    _user.password = pbkdf2.pbkdf2Sync('1234', salt, 1000, 32, 'sha256').toString();
    // salts.push({
    //     id: _user.id,
    //     salt: crypto.randomBytes(32)
    // })
    users.push(_user);
    _user = {
        id: uid(),
        firstName: 'Михаил',
        surName: 'Стариков',
        post: 'Ведущий специалист',
        email: 'mikhail.starikov@gmail.com',
        office: 'корпус 504 комната 248',
        phone: '52111',
        usePassword: false,
        password: '',
        salt: '',
        roles: [
            roles.customer.id
        ]
    };
    // salts.push({
    //     id: _user.id,
    //     salt: crypto.randomBytes(32)
    // })
    users.push(_user);
})()

var user = (i) => {
    var _id = uid();
    _user = {
        id: _id,
        firstName: 'Дмитрий',
        surName: 'Гребенев' + i,
        post: 'Начальник службы',
        email: 'dmitriy.grebenev1@gmail.com',
        office: 'корпус 504 комната 248',
        phone: '52112',
        usePassword: false,
        password: '',
        salt: '',
        roles: [
            roles.administrator.id,
            roles.customer.id
        ]
    }
    return _user;
}

var setUsers = () => {
    for (var i = 0; i <= 15000; i++) {
        users.push(user(i));
        // salts.push({
        //     id: user.id,
        //     salt: crypto.randomBytes(32)
        // })
    }
   // console.log(users)
};

setUsers();

// var users = [    
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Dmitriy' },
//     { name: 'Ivan' }
// ]

router.get('/', (req, res) => {
    //console.log(req.session);
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

        if (user.usePassword) {
            var salt = crypto.randomBytes(32)
            salts.push({
                id: user.id,
                salt: salt,
            })
            user.password = pbkdf2.pbkdf2Sync(user.password, salt, 1000, 32, 'sha256').toString();
        }
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
            else {
                if (user.usePassword) {
                    if (user.password !== item.password) {
                        var _salts = salts.filter(itemSalt => itemSalt.id == user.id);
                        if (_salts.length == 0) {
                            salt = crypto.randomBytes(32);
                            salts.push({
                                id: user.id,
                                salt: salt,
                            })
                        }
                        else salt = _salts[0].salt;

                        //var pass = pbkdf2.pbkdf2Sync(user.password, salt, 1000, 32, 'sha256').toString()                      

                        user.password = pbkdf2.pbkdf2Sync(user.password, salt, 1000, 32, 'sha256').toString();
                    }
                    else {

                    }
                }
                return user;
            }
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

module.exports = {
    router,
    authUser
}