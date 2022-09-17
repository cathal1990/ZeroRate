const router = require('express').Router();
const { User } = require('../../db').models;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const requireToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = await User.byToken(token);
      req.user = user;
      next();
    } catch(error) {
      next(error);
    }
  };

router.get('/', requireToken, async(req, res, next) => {
  try{
    if(req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(404);
    }
  }
  catch(err) {
    next(err)
  }
});

router.post('/', async (req, res, next) => {
    try{
        const user = await User.authenticate(req.body)

        if(user) {
          const token = await user.generateToken();
          res.send(token);
        }else {
          res.sendStatus(404)
        }
    }
    catch(err) {
        next(err);
    }
})

module.exports = router