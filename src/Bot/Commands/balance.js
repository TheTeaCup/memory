const Discord = require("discord.js");
const Quick = require("quick.db");

module.exports.run = async (Memory, message, args) => { // eslint-disable-line no-unused-vars 
  
  let user = message.mentions.users.first()
  if(!user)user = message.author;
  
  let balance = await Quick.fetch(`balance_${user.id}`);
  if(!balance)balance = "0";
  
  let balanceEmbed = new Discord.RichEmbed()
  .setColor(Memory.Color)
  .setThumbnail(user.avatarURL)
  .setDescription(`**${user.username} 's Bank Info \n\n Balance: \`$${balance}\` \n Other: \`N/A\` **`)
  
  message.channel.send(balanceEmbed);
};

exports.help = {
  name: "balance",
  description: "Gives a Users balance.",
  usage: "balance [@user]",
  catagory: "Fun"
};

exports.conf = {
  Aliases: [ "bal" ] 
};