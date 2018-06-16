// Configuration du module
let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);

var User = require("../models/user");
var Tap = require("../models/tap");

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
    newUser.save(function(err, user) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      var token = jwt.sign(newUser.toJSON(), config.secret);
      // return the information including token as JSON
      res.json({
        success: true,
        msg: 'Successful created new user.',
        token: 'JWT ' + token, 
        username: user.firstname
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
          res.json({success: true, token: 'JWT ' + token, username: user.firstname});
          console.log(user.firstname);
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/tap', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    if (!req.body.score || !req.body.username) {
      res.json({success: false, msg: 'Please pass username and score.'});
    } else {
      var newTap = new Tap({
        score: req.body.score,
        username: req.body.username
      });
      // save the user
      newTap.save(function(err, tap) {
        if (err) {
          return res.json({success: false, msg: 'Save tap failed.'});
        }
        res.json({
          success: true,
          msg: 'Successful created new tap.'
        });
      });
    }
  } else {
    return res.status(401).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/scores', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Tap.find(function(err, scores) {
      if (err) throw err;

      if (!scores) {
        res.status(404).send({success: false, msg: 'Scores not found.'});
      } else {
        res.json({success: true, scores: scores});
      }
    });
  } else {
    return res.status(401).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Export du module
module.exports = router;