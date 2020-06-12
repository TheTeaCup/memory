const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars
  
        let name = args.slice(1).join(' ');
        let phoneNumber = args[0];

        let response = await Phone.addContact(message.author.id, name, phoneNumber);
        message.channel.send(`${response.result == 'error' ? ':no_good:' : ':white_check_mark:'} ${response.message}`);
  
};

exports.help = {
  name: "addcontact",
  description: "dd a contact to easily call someone",
  usage: "addcontact <phone-number> <name>",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};