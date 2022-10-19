const express = require('express')
const router = require('express').Router();
const loginRouter = require('./routes/login.js')

router.use('/auth', loginRouter);


module.exports = router;