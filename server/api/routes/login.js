const router = require('express').Router();
const { User } = require('../../db').models;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const requireToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const user = await User.byToken(token);
      req.user = user;
      next();
    } catch(error) {
      next(error);
    }
  };

router.get('/', requireToken, async(req, res, next) => {
if(req.user) {
    res.send(req.user);
} else {
    res.sendStatus(404);
}
});

router.post('/', async (req, res, next) => {
    try{
        const user = await User.authenticate(req.body)
        console.log(req.body)
        // if(!user) {
        //   res.sendStatus(404)
        // }
        if(user) {
          const token = await user.generateToken();
          res.send(token);
        }
        res.sendStatus(404)
    }
    catch(err) {
        next(err);
    }
})

module.exports = router