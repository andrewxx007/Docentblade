"use strict"

const express = require('express');
const User = require('../app/controllers/user');
const data_handler = require('../app/controllers/data_handler');
const router = express.Router();

router.route('/')
    .post((req, res) => {
        const userProperties = ['_name', '_lastname', '_email', '_password'];
        let user = req.body;
        let notin = [];
        for(let i in userProperties) {
            let checker = 0;
            for(let property in user){
                if(property == userProperties[i]) {
                    checker++;
                }
            }
            if (checker == 0){
                notin.push(userProperties[i]);
            }
        }
        if(notin.length > 0) {
            res.type('text/plain; charset=utf-8');
            res.status(400).send(`Missing properties: ${notin}`);
        }else {
            data_handler.createUser(user);
            res.type('text/plain; charset=utf-8');
            res.status(201).send(`User ${user._name} was created!`);
        }
    })

/*router.route('/:id')
    .put((req, res) => {
        let id = req.params.id;
        let user = req.body;
        let userChecker = data_handler.getUsers();
        let checker = 0;
        for (let i in userChecker) {
            if (id == userChecker[i]._userID) {
                checker++;
            }
        }
        if(checker > 0) {
            const userProperties = ['_name', '_lastname', '_email', '_password'];
            let notin = [];
            for (let prop in user) {
                let verificador = 0;
                for(let i in userProperties) {
                    if(prop == userProperties[i]) {
                        verificador++;
                    }
                }
                if(verificador==0){
                    notin.push(prop);
                }
            }
            if(notin.length > 0){
                res.type('text/plain; charset=utf-8');
                res.status(400).send(`Not founded properties: ${notin}`);
            }else{
                user = data_handler.updateUser(id, user)
                res.type('text/plain; charset=utf-8');
                res.send(`User ${user._userID} was updated!`); 
            }
        }
    })*/

module.exports = router;