const Discord = require('discord.js');
const db = require("quick.db");
module.exports = function(req, res, bot){
 //console.log(req.headers.authorization)

   
 
   let user = req.body.user

       
       //console.log(user)
    let f = + 100
        if(bot.users.get(user)){
          db.add(`balance_${user}`, f)
            let embed = new Discord.RichEmbed()
            .setColor(bot.Color)
            .setThumbnail()
            .setTitle('Thank you for voting, ' + bot.users.get(user).tag + '!')
               .setDescription('More updates are coming and what you just did gives me more motivation!\n\n And as a gift i give you 100 coins');
            bot.users.get(user).send(embed).catch((err)=>{});
        
 };

    
}