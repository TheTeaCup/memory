module.exports = async(Bumper) => {
  console.log('( Bot ) Connected to Discord.');
  
Bumper.user.setPresence({ game: { name: `Coming Soon!`,  type: 2 } });
Bumper.user.setStatus('dnd')
  
//Dashboard Owner Sync
Bumper.appInfo = await Bumper.fetchApplication();
setInterval( async () => {
Bumper.appInfo = await Bumper.fetchApplication();
}, 60000);
  
const BFD = require("bfd.js");
const bfd = new BFD(process.env.BFD);
  
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL, Bumper);
  
const MythicalAPI = require("mythical-api");
let API = new MythicalAPI(process.env.MBL);
  
/* DBL Events */
dbl.on('posted', () => {
  console.log('[Memory] Server count was sent to DBL');
});

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
});
  
API.postStats(Bumper.guilds.size, Bumper.user.id);
  
};