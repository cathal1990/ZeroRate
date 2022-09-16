const express = require('express')
const router = require('express').Router();
const loginRouter = require('./routes/login.js')
// const studentsRouter = require('./routes/students')

router.use('/auth', loginRouter);
// router.use('/students', studentsRouter);


module.exports = router;