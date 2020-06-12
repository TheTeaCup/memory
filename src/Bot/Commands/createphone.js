const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars
  
    let response = await Phone.create(message.author.id);

    message.channel.send(`${response.result == 'error' ? ':no_good:' : ':white_check_mark:'} ${response.message}`)
  
};

exports.help = {
  name: "createphone",
  description: "Gives The bots help menu.",
  usage: "createphone",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ "cp" ] // No Aliases.
};