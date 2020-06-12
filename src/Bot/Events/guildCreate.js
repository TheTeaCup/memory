const Discord = require('discord.js');
var send = require('quick.hook');

module.exports = async(Bumper, guild) => {   
  
         console.log(`The bot just joined to ${guild.name}, Owned by ${guild.owner.user.tag}`);  
         const logsServerJoin2 = Bumper.channels.get('546373089886208020');
         let a = "Welcome!";
  
            const embed = new Discord.RichEmbed()
            .setColor(Bumper.Color)
            .setAuthor(`i Joined ${guild.name}`, "https://images-ext-1.discordapp.net/external/3vb7X0yysUyIs3XxOs6s0X-gB6PH8PG80rFbv_7iQeI/https/dlnbots.github.io/images/join.png")
            .setThumbnail(guild.iconURL)
            .addField(`${guild.name}`, `I am now in \`${Bumper.guilds.size}\``)
            .addField("Member Info", `**Total Users Count:** \`${guild.memberCount}\`\n\n**Member Count:** \`${guild.members.filter(member => !member.user.bot).size}\`\n**Bot Count:** \`${guild.members.filter(member => member.user.bot).size}\``, true)
            .addField("Server Info", `**Owner:** \`${guild.owner.user.tag}\`\n**Host Region:** \`${guild.region}\`\n**Verification Level:** \`${guild.verificationLevel}\`\n**Server ID:** \`${guild.id}\``, true)
            .setTimestamp()
            .setFooter(`Memory © Koala Dev 2019`, Bumper.users.get("453601455698608139").avatarURL)
            logsServerJoin2.setTopic(`Bot Stats: Users ${Bumper.users.size} || Guilds ${Bumper.guilds.size}`)
  

     send(logsServerJoin2, embed, {
        name: `Memory Server Logging`,
         icon: `https://cdn.glitch.com/a520678f-69fc-419a-a86e-183f8537d353%2Fmemory.png?v=1561656247185`
    })

 // Bumper.desc.set(guild.id, "gg",'desc')
  
};