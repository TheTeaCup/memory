const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('parse-ms');

exports.run = async (Memory, message, args) => {
  
    let cooldown = 8.64e+7;
    let amount = 150;
    let Prefix = "m-"
    let job = await db.fetch(`userJob_${message.author.id}`);
    if(!job)return message.channel.send(`Hello, ${message.author.tag} You have not set your job! Do \`${Prefix}job\` to set one.`)

    let lastDaily = await db.fetch(`lastDaily_${message.author.id}`);
  
    try {
     
   let start = await db.fetch(`userBalance_${message.author.id}`)
   if(start === null)start = "0"
 let c = start + amount
      console.log(c)
 await db.set(`userBalance_${message.author.id}`, c).then(i => {
      
 if (i === null) i = 0;

  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
      
        let timeObj = ms(cooldown - (Date.now() - lastDaily))

    let sEmbed = new Discord.RichEmbed()
     .setColor(Memory.Color)
     .setDescription(`You Have Already Collected Your Sallary, You Must Wait **${timeObj.hours}hrs ${timeObj.minutes}min**`)
     message.channel.send(sEmbed)
      
    } else {
      
        db.set(`lastDaily_${message.author.id}`, Date.now());
       db.add(`balnces_${message.guild.id}_${message.author.id}`, amount)
      db.add(`balnces_123_${message.author.id}`, amount)
        db.add(`balance_${message.member.id}`, amount).then(i => {
    
  let embed = new Discord.RichEmbed()
        .setTitle(`Bank Statement`)
        .setColor(Memory.Color)
        .setDescription(`You have collected sallary as working as \`${job}\`\n You got payed \`$${amount}\`.`)
        message.channel.send(embed)
          
           
        })};
    })
    } catch(err) {
    };
 };

module.exports.help = {
  name: "daily",
  description: "Get your daily allowance.",
  usage: "daily",
  catagory: "Fun"
}
exports.conf = {
  Aliases: [ ]
};