"use strict"

const express = require('express');
const router = require('./app/controllers/router');
const app = express();
const port = 3000;
const cors = require('cors')
//var app = express()

//app.use(cors({origin: ['http://127.0.0.1:5500']}));
app.use(cors());


app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on a port ${port}`)
})