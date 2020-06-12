const Discord = require('discord.js');
const db = require("quick.db");
var send = require('quick.hook');
const Quick = require("quick.db");

module.exports = async(Bumper, guild) => {
  
    const logsServerJoin2 = Bumper.channels.get('546373089886208020');
     console.log(`The bot has been left ${guild.name}, Owned by ${guild.owner.user.tag}`);
      const embed = new Discord.RichEmbed()
            .setColor(Bumper.Color)
            .setAuthor(`I have left ${guild.name}`, "https://images-ext-1.discordapp.net/external/qBdcbDveLYsigBBmlqmQVyoRoxv--WLu0d_M3YkWiow/https/dlnbots.github.io/images/leave.png")
            .setThumbnail(guild.iconURL)
            .addField(`${guild.name}`, `I am now in \`${Bumper.guilds.size}\``)
            .setTimestamp()
            .setFooter(`Memory © Koala Dev 2019`, Bumper.users.get("453601455698608139").avatarURL)
      
       //db.delete(`bumps_${guild.id}`)
       logsServerJoin2.setTopic(`Bot Stats: Users ${Bumper.users.size} || Guilds ${Bumper.guilds.size}`)
  
       send(logsServerJoin2, embed, {
        name: `Memory Server Logging`,
         icon: `https://cdn.glitch.com/a520678f-69fc-419a-a86e-183f8537d353%2Fmemory.png?v=1561656247185`
    })
      
/*  await Bumper.desc.remove(guild.id)
  await Bumper.hidden.remove("hide", guild.id);
  await Bumper.officalServers.remove("Offical", guild.id);
   Quick.delete(`description_${guild.id}`);
   Quick.delete(`pChannel_${guild.id}`);
   Quick.delete(`banner_${guild.id}`);
   Quick.delete(`hex_${guild.id}`);
   */
  
};