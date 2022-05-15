"use strict";

const express = require('express');
const Docent = require('../app/controllers/docent');
const data_handler = require('../app/controllers/data_handler');
const router = express.Router();

router.route('/')
    .post((req, res) => {
        const docentProperties = ['_docentName', '_course', '_score', '_bestReco', '_captainReco', '_deadReco', '_comments', '_register', '_avgScore', '_avgBest', '_avgCaptain', '_avgDead', '_avgReco'];
        let docent = req.body;
        let notin = [];
        for (let i in docentProperties) {
            let checker = 0;
            for (let property in docent) {
                if (property == docentProperties[i]) {
                    checker++;
                }
            }
            if (checker == 0) {
                notin.push(docentProperties[i]);
            }
        }
        if (notin.length > 0) {
            res.type('text/plain; charset=utf-8');
            res.status(400).send(`Missing properties: ${notin}`);
        } else {
            data_handler.createDocent(docent);
            res.type('text/plain; charset=utf-8');
            res.status(201).send(`Docent ${docent._docentName} was created!`);
        }
    })

router.route('/:id')
    .put((req, res) => {
        let id = req.params.id;
        let docent = req.body;
        let docentChecker = data_handler.getDocents();
        let checker = 0;
        for (let i in docentChecker) {
            if (id == docentChecker[i]._docentID) {
                checker++;
            }
        }
        if (checker > 0) {
            const docentProperties = ['_docentName', '_course', '_score', '_bestReco', '_captainReco', '_deadReco', '_comments', '_register', '_avgScore', '_avgBest', '_avgCaptain', '_avgDead', '_avgReco'];
            let notin = [];
            for (let prop in docent) {
                let verificador = 0;
                for (let i in docentProperties) {
                    if (prop == docentProperties[i]) {
                        verificador++;
                    }
                }
                if (verificador == 0) {
                    notin.push(prop);
                }
            }
            if (notin.length > 0) {
                res.type('text/plain; charset=utf-8');
                res.status(400).send(`Not founded properties: ${notin}`);
            } else {
                docent = data_handler.updateDocent(id, docent)
                res.type('text/plain; charset=utf-8');
                res.send(`Docent ${docent._docentName} was updated!`);
            }
        }
    })

module.exports = router;