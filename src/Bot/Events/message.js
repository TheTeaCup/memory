const Discord = require("discord.js");
const Quick = require("quick.db");
module.exports = async(Bumper, message) => {

  if (message.author.bot) return undefined;
  
  if(message.content === "call" || "m-call") {} else { if (message.channel.type != "text") return undefined; }
  
  let Prefix = "m-"
  
 /* if (message.content == "<@478730166680420373>") {
    const embed2 = new Discord.RichEmbed()
    .setTitle("You Ring?")
    .setColor(Bumper.Color)
    .setDescription(`Need Help? then do ${Prefix}help!`)
    
    message.channel.send(embed2)
  }; */
  
  if (message.content.indexOf(Prefix) !== 0) return undefined;
  if(message.guild) {
  console.log(`${message.guild.name}[${message.guild.id}] - ${message.author.tag} - ${message.content}`);
  } else {
  console.log(`${message.author.tag} - ${message.content}`);
  };
    
  let args = message.content.slice(Prefix.length).trim().split(/ +/g);
  let Command = args.shift().toLowerCase();
  
  let BumperCommand;
	if (Bumper.Commands.has(Command)) { 
    BumperCommand = Bumper.Commands.get(Command);	
  } else if (Bumper.Aliases.has(Command)) { 
    BumperCommand = Bumper.Commands.get(Bumper.Aliases.get(Command));	
  } else {
    return undefined;
  };

	BumperCommand.run(Bumper, message, args);

};