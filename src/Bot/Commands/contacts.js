const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
const Utils = require('../Handlers/Utils.js');
const {Confirmation, Pagination} = require('discord-interface');

exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = "m-"
  
  if (!await Phone.hasPhone(message.author.id)) return message.channel.send(`:no_good: You don't have a phone number. Create one using \`${prefix}createphone\``);

  let phone = await Phone.getByUserID(message.author.id);
  if (phone.contacts.length == 0) return message.channel.send(`:cry: You don't have any contact saved. Add one using \`${prefix}addcontact\``);

  let pages = Utils.pagify(phone.contacts, 10);

  const getPage = (page, pageNumber) => {
        let description = page.map(contact => `:bust_in_silhouette: **${contact.name}** \`${contact.phone}\``);
    
        return new Discord.RichEmbed()
          .setAuthor(`${message.author.username}'s Contacts`, message.author.displayAvatarURL)
          .setColor(Memory.Color)
          .setFooter(`Page ${pageNumber}/${pages.length}`, Memory.user.displayAvatarURL)
          .setTimestamp()
          .setDescription(description);
    }

        createPagination({items: pages, getPage: getPage, userID: message.author.id});
  
    async function createPagination(options) {
        let pagination = Pagination.create(message, options);
        return pagination;
    }
  
};

exports.help = {
  name: "contacts",
  description: "Gives The bots help menu.",
  usage: "contacts",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};