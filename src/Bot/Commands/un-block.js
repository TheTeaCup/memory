const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = "m-"
  
  if (!await Phone.hasPhone(message.author.id)) return message.channel.send(`:no_good: You don't have a phone number. Create one using \`${prefix}createphone\``);

  let response = await Phone.unblock(message.author.id, args[0]);

  message.channel.send(`${response.result == 'error' ? ':no_good:' : ':white_check_mark:'} ${response.message}`);
  
};

exports.help = {
  name: "un-block",
  description: "Unblock a phone number",
  usage: "unblockphone <phone-number>",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ "unblock" ]
};