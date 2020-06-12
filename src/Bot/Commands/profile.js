const Discord = require("discord.js");
const Quick = require("quick.db");
const User = require('../Handlers/User.js');
exports.run = async(Memory, message, args) => { // eslint-disable-line no-unused-vars

  let user = await User.getByID(message.author.id); //Getiing User
  
  message.channel.send(new Discord.RichEmbed()
            .setAuthor(`${message.author.username}'s Profile`, message.author.displayAvatarURL)
            .setColor(Memory.Color)
            .setTimestamp()
            .addField(':e_mail: E-mail', user.email ? `${user.email}@discordretro.com` : '**Inexistent**')
            .addField(':iphone: Phone', user.phone || '**Inexistent**')
                       )
  
  
};

exports.help = {
  name: "profile",
  description: "Displays your e-mail and phone information.",
  usage: "profile",
  catagory: "Profile"
};

exports.conf = {
  Aliases: [] // No Aliases.
};