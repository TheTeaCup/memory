const Discord = require("discord.js");
const Quick = require("quick.db");
const ms = require('ms');

module.exports.run = async (Memory, message, args) => { // eslint-disable-line no-unused-vars
  
    let Prefix = "m-"
    let job = await Quick.fetch(`userJob_${message.author.id}`);
    if(!job)return message.channel.send(`Hello, ${message.author.tag} You have not set your job! Do \`${Prefix}job\` to set one.`);
  
    let amount = "$50";
    let time = "10s";
    let time2 = "18s"
    let act = + 50
  
   let gointoJobEmbed = new Discord.RichEmbed()
   .setColor(Memory.Color)
   .setDescription(`**Driving to work**\n 🚙 **. . . .**`)
   
   let atJobEmbed = new Discord.RichEmbed()
   .setColor(Memory.Color)
   .setDescription(`**You have arrived at work** 🏘`)
   
   let payCheck = new Discord.RichEmbed()
   .setColor(Memory.SuccessColor)
   .setTitle("Pay Check")
   .setDescription(`You got \`${amount}\` Today at work for helping a client!`)
   
   let pahseTwo = await message.channel.send(gointoJobEmbed);
   
   setTimeout(() => {
     pahseTwo.edit(atJobEmbed);
   }, ms(time));
  
  setTimeout(() => {
     pahseTwo.edit(payCheck);
      Quick.add(`balance_${message.author.id}`, act);
    Quick.add(`balnces_123_${message.author.id}`, act)
     Quick.add(`balnces_${message.guild.id}_${message.author.id}`, act)
    
   }, ms(time2));
   
};

exports.help = {
  name: "work",
  description: "Go to work.",
  usage: "work",
  catagory: "Fun"
};

exports.conf = {
  Aliases: [ ] 
};