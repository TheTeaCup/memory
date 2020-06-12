const Discord = require('discord.js');
const mongoose = require('mongoose');

/**
  * Create our client
  */
const Memory = new Discord.Client({
  disabledEvents: [
    'CHANNEL_PINS_UPDATE', 
    'RELATIONSHIP_ADD', 
    'RELATIONSHIP_REMOVE', 
    'TYPING_START'
  ],
  messageCacheMaxSize: 100,
  messageCacheLifetime: 240,
  messageSweepInterval: 300,
  fetchAllMembers: true
});

/**
  * Require external files that Bumper needs.
  */
require('./Handlers/EventHandler.js')(Memory);
require('./Handlers/CommandHandler.js')(Memory);
//require('./Handlers/FunctionHandler.js')(Memory);
let Bumper = Memory;
Bumper.Developers = [ 
  '338192747754160138', /* Tea Cup#9999 */
  '320602199006642178' //Saul
];
Bumper.Staff = [
  '364007557045551106',
  '320602199006642178'
];
Bumper.Website = 'https://project-memory.glitch.me';

require('./Data/Database.js')(Memory);
Bumper.Commands = new Discord.Collection();
Bumper.Aliases = new Discord.Collection();
Bumper.Cata = new Discord.Collection();

Bumper.Color = '#fb9b9e';
Bumper.ErrorColor = 0xF64465;

mongoose.connect("mongodb+srv://teacup:7vI5Mc2i5Z0ejiYl@cluster0-qbuzy.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

module.exports = Memory;
require("./Leveling.js")