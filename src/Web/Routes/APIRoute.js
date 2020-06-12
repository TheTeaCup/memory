const Router = require('express').Router();
const passport = require('passport');
const Bumper = require('../../Bot/MemoryClient.js');
const Quick = require("quick.db")

/** 
  * Main API route
  */

Router.get('/callback', passport.authenticate('discord', { failureRedirect: '/404' }), (req, res) => {
  //console.log(`Testing: ` + req.query.state);
   if (Bumper.Developers.includes(req.user.id)) { 
    req.session.isAdmin = true; 
  } else { 
    req.session.isAdmin = false; 
  };
    res.redirect(req.query.state);
});

module.exports = Router;