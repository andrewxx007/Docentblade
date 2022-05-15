const express = require('express');
const Docent = require('../app/controllers/docent');
const data_handler = require('../app/controllers/data_handler');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        let users = data_handler.getDocents();
        res.status(200).json(users);
    })

module.exports = router;