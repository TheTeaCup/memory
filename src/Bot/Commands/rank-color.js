const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  if(!args[0]) {
    return message.channel.send(`Please provide a hex code. \n Ex: \`#fff\``);
  };
  
  var hex = args[0].replace("#","");
  if(hex.length != 6)return message.channel.send("Must be 6-digit hexadecimal color code");

   var color = args[0]
    
Quick.set(`hexcode_${message.author.id}`, color)
      
  let embed = new Discord.RichEmbed()
  .setTitle("Bumper Rank Color")
  .setDescription("Color for your rank card successfuly changed! \nNow color - \`" + color + "\`")
  .setColor(Bumper.Color)
  message.channel.send(embed);
   
  
  
};
exports.help = {
  name: "rank-color",
  description: "Set your rank color",
  usage: "rank-color <hexcode>",
  catagory: "Fun"
};

exports.conf = {
  Aliases: [] // No Aliases.
};