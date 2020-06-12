const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars
  
        let phoneNumber = args[0];

        let response = await Phone.removeContact(message.author.id, phoneNumber);
        message.channel.send(`${response.result == 'error' ? ':no_good:' : ':white_check_mark:'} ${response.message}`);
  
};

exports.help = {
  name: "removecontact",
  description: "Remove a contact from your saved contacts",
  usage: "removecontact <phone-number>",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};