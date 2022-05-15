"use strict"

const express = require('express');
const path = require('path');
const router = express.Router();

const adminUserRouter = require('../../routes/user_admin');
const userRouter = require('../../routes/user');

const adminDocentRouter = require('../../routes/docent_admin');
const docentRouter = require('../../routes/docent');

router.use('/admin/users', adminUserRouter);
router.use('/users', userRouter);

router.use('/admin/docents', adminDocentRouter);
router.use('/docents', docentRouter);

router.get('/', (req, res) => {
    res.send('Docentblade');
})

module.exports = router;