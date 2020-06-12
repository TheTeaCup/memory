const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
const Utils = require('../Handlers/Utils.js');
const User = require('../Handlers/User.js');
const {Confirmation, Pagination} = require('discord-interface');

exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars
  
if (!await Phone.hasPhone(message.author.id)) return message.channel.send(`:no_good: You don't have a phone number. Create one using \`.createphone\``);

let phone = await Phone.getByUserID(message.author.id);
//if (!phone.history) return message.channel.send(`:cry: You don't have any phone call on your history.`);
if (phone.history.length == 0) return message.channel.send(`:cry: You don't have any phone call on your history.`);

    const getPage = (item, pageNumber) => {
      //console.log(item)
            return new Discord.RichEmbed()
                .setAuthor(`${message.author.username}'s Contacts`, message.author.displayAvatarURL)
                .setColor(Memory.Color)
                .setFooter(`Page ${pageNumber}/${phone.history.length}`, Memory.user.displayAvatarURL)
                .setTimestamp(item.timestamp)
                .setDescription(`You had a call with **${item.caller}** that lasted for **${Utils.format(item.duration)}**`);
      }

      createPagination({items: phone.history, getPage: getPage, userID: message.author.id});
  
      async function createPagination(options) {
        let pagination = Pagination.create(message, options);
        return pagination;
    }
  
};
  
exports.help = {
  name: "callhistory",
  description: "Displays your call history",
  usage: "callhistory",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};
