const Router = require('express').Router();
const Bumper = require('../../Bot/MemoryClient.js');
const showdown = require('showdown');
const Quick = require("quick.db");

/** 
  * Main page
  */
Router.get('/', async(req, res) => {
  
   let Page = "Home";
   let Query = req.query.q
   let Message = null;
   let MessageDefined = null;
   let give = null;
   if(Query === "SUCCESSFULY_LOGGEDOUT") { Message = "You are now logged out.", MessageDefined = 1; };
   if(Query === "SENT_FEEDBACK") { Message = "Your FeedBack was submitted!", MessageDefined = 1; };
   res.render(process.cwd() + '/src/Web/Views/index.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, Message, MessageDefined, give });
});


Router.get('/login', (req, res) => {
  let redirect = req.query.redirect;
  if(!redirect) redirect = "/me";
  //console.log(redirect)
  res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=536931319158931470&redirect_uri=https%3A%2F%2Fproject-memory.glitch.me%2Fapi%2Fcallback&response_type=code&scope=identify%20guilds&state=' + redirect);
});

Router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    req.logout();
    res.redirect('/?q=SUCCESSFULY_LOGGEDOUT');
  });
});

Router.get('/discord', (req, res) => {
  res.redirect("https://discord.gg/3Na5Stg");
});

Router.get('/feedback', async(req, res) => {
   let Page = "Feedback";
   let ErrorMessage = null;
   let Error = req.query.error;
   if(Error === "not_msg") ErrorMessage = "no_message";
  res.render(process.cwd() + '/src/Web/Views/feedback.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, ErrorMessage });
});

Router.post('/feedback/post/suggestion', checkAuth, async(req, res) => {
  if(req.body.suggestion) {
    Bumper.emit('suggestionSubmit', req);
    
    res.redirect('/?q=SENT_FEEDBACK');
  } else { 
    res.redirect('/feedback?error=not_msg');
  }
});

Router.post('/feedback/post/bug', checkAuth, async(req, res) => {
  if(req.body.bug) {
    Bumper.emit('suggestionBug', req);
    
    res.redirect('/?q=SENT_FEEDBACK');
  } else { 
    res.redirect('/feedback?error=not_msg') 
  }
});

module.exports = Router;

/*
 * Authorization check, if not authorized return them to the login page.
 */
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  } else {
    req.session.backURL = req.url

    res.redirect('/login?redirect=' + req.url);
  }
};