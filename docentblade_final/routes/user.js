"use strict";

const express = require('express');
const User = require('../app/controllers/user');
const data_handler = require('../app/controllers/data_handler');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        let users = data_handler.getUsers();
        res.status(200).json(users);
    })

module.exports = router;