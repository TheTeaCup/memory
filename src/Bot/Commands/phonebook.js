const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
const Utils = require('../Handlers/Utils.js');
const {Confirmation, Pagination} = require('discord-interface');

exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = "m-"
  
  let publicPhones = await Phone.getPublicPhoneNumbers();
  if (publicPhones.length == 0) return this.message.say(`:cry: There isn't any public number at the moment. Turn your phone number public using \`.${prefix}public\``);

  let pages = Utils.pagify(publicPhones, 10);

  const getPage = (page, pageNumber) => {
    let description = page.map(phoneNumber => `:iphone: **${phoneNumber}**`);
    
    return new Discord.RichEmbed()
      .setAuthor(`Phone Book`, Memory.user.displayAvatarURL)
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
  name: "phonebook",
  description: "Displays public phones",
  usage: "phonebook",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ "ph" ] // No Aliases.
};