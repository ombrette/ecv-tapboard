// Configuration du module
let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);

var User = require("../models/user");

// Configuration de la route principale => http://localhost:8080/api/
router.get('/', (req, res, next) => {
   res.json({ res: 'Bienvenue dans votre API' })
});

router.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname) {
    res.json({success: false, msg: 'Please pass username, password and nickname.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      var token = jwt.sign(newUser.toJSON(), config.secret);
      // return the information including token as JSON
      res.json({
        success: true,
        msg: 'Successful created new user.',
        token: 'JWT ' + token
      });
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// Export du module
module.exports = router;