const Discord = require("discord.js");
const Quick = require("quick.db");

module.exports.run = async (Memory, message, args) => { // eslint-disable-line no-unused-vars
  
let Jobs = [ "Plumber", "Babysitter", "Bank Teller", "Accountant", "Actor", "Pilot", "Engineer", "Cook", "Bartender", "Scientist", "Biologist", "Lawyer", "Nurse", "Dentist" ]
    let Prefix = await Quick.fetch(`prefix_${message.guild.id}`);
    if(!Prefix)Prefix = "m-";
    let userJob = await Quick.fetch(`userJob_${message.author.id}`);
    let balance = await Quick.fetch(`balance_${message.author.id}`);
    if(!balance)balance = "0";
 
if(!args[0]){
  
let JobEmbed = new Discord.RichEmbed()
.setColor(Memory.Color)
.setDescription(`You can chose a job by doing \`${Prefix}Job <JobName>\` \n\n We currently have \`${Jobs.length}\` Jobs to chose from\n\n **${Jobs.join('\n')}** \n\n **__Once you select a Job you cant change it__**`)
message.channel.send(JobEmbed);
  
};
  
  if (args[0].toLowerCase() === "reset"){

    if(balance > 50){
    
  Quick.subtract(`balance_${message.author.id}`, 50)
      
  let reset = new Discord.RichEmbed()
  .setColor(Memory.Color)
  .setDescription(`You have left your Job, \n you may now chose another.`)
  return message.channel.send(reset);
  } else { 

  let error = new Discord.RichEmbed()
  .setColor(Memory.Color)
  .setDescription(`You have less than \`$50\`. **You need \`+50\` to leave a Job**`)
 return message.channel.send(error);
    
  };
  }; 
  
 if(args[0]){
  if(userJob){
    let error = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`Sorry, ${message.author.tag} you have already selected a Job. \n **If you wish to change please do \`${Prefix}job Reset\`.** `)
    return message.channel.send(error)
  };
 };
  
  if(args[0].toLowerCase() === "plumber"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Plumber\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "plumber")
    
  } else if(args[0].toLowerCase() === "babysitter"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Babysitter\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "babysitter")
    
  } else if (args[0].toLowerCase() === "bank teller"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Bank Teller\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "bank teller")
    
  } else if (args[0].toLowerCase() === "accountant"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Accountant\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "accountant")
    
  } else if (args[0].toLowerCase() === "actor"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Actor\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "actor")
    
  } else if (args[0].toLowerCase() === "pilot"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Pilot\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "pilot")
    
  } else if (args[0].toLowerCase() === "engineer"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Engineer\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "engineer")
    
  } else if (args[0].toLowerCase() === "cook"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Cooks\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "cook")
    
  } else if (args[0].toLowerCase() === "bartender"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Bartender\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "bartender")
    
  } else if (args[0].toLowerCase() === "scientist"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Scientist\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "scientist")
    
  } else if (args[0].toLowerCase() === "biologist"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Biologist\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "biologist")
    
  } else if (args[0].toLowerCase() === "lawyer"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Lawyer\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "lawyer")
    
  } else if (args[0].toLowerCase() === "nurse"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Nurse\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "nurse")
    
  } else if (args[0].toLowerCase() === "dentist"){
    
    let job = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`You have selected \`Dentist\`.`)
    message.channel.send(job);
    Quick.set(`userJob_${message.author.id}`, "dentist")
    
  } else {
    
    let incorrect = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setDescription(`The job \`${args[0]}\` is not one of our choces. \n **Please try again.**`)
    message.channel.send(incorrect);
    
  };
  
};

exports.help = {
  name: "job",
  description: "Choose your job",
  usage: "job <job name>",
  catagory: "Fun"
};

exports.conf = {
  Aliases: []
};