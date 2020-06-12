const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Memory, msg, args) => { // eslint-disable-line no-unused-vars
 
    
  
        let categories = [
            {"key": "Phone", "emoji": "📱"},
            {"key": "Profile", "emoji": "👤"},
            {"key": "Email", emoji: "📧"},
            {"key": "Utils", "emoji": "⚙"},
            {"key": "Fun", "emoji": "🤡"}
        ]

        let getPage = (mainMenu = true, categoryKey) => {
            if (mainMenu) {
                let description = categories.map(category => `${category.emoji} ${category.key}`).join('\n\n');
                
                return new Discord.RichEmbed()
                    .setAuthor('Choose one category by reacting', Memory.user.displayAvatarURL)
                    .setColor(Memory.Color)
                    .setDescription(description)
                    .setTimestamp()
            } else {
    
                let commands = Memory.Commands.filter(command => command.help.catagory == categoryKey);
               // console.log(commands)
                let commandsText = commands.map(command => `[\`${command.help.usage}\`](https://project-memory.glitch.me/) **»** ${command.help.description}`).join('\n\n');
  
              
                return new Discord.RichEmbed()
                    .setAuthor(`Commands list of ${categoryKey}`, Memory.user.displayAvatarURL)
                    .setColor(Memory.Color)
                    .setDescription(`Use :card_box: to return.\n\n${commandsText}`)
                    .setTimestamp()
                    .setFooter('[parameter] = Optional | <parameter> = Required', Memory.user.displayAvatarURL)
            }
        }

        let channel = msg.channel;

       /* try {
            channel = await msg.author.createDM();

            msg.channel.send(':mailbox_with_mail: Check your private messages.');
        } catch (err) {
            channel = msg.channel
        }
      */
    
        let message = await channel.send(getPage());
    
        let categoryEmojis = categories.map(category => category.emoji);
        let reactions = ['🗃', ...categoryEmojis, '🚫'];
    
        let filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id == msg.author.id;
        let collector = await message.createReactionCollector(filter, {time: 300000});
    
        collector.on('collect', async reaction => {
            if (reaction.emoji.name == '🚫') return collector.stop();
    
            if (reaction.emoji.name == '🗃') return await message.edit(getPage());
    
            let categoryKey = categories.find(category => category.emoji == reaction.emoji.name).key;
            await message.edit(getPage(false, categoryKey));
        });

        collector.on('end', async () => {
            if (!message.deleted) await message.delete();
        });

        for (let reaction of reactions) await message.react(reaction);
 
};

exports.help = {
  name: "help",
  description: "Gives The bots help menu.",
  usage: "Help",
  catagory: "Utils"
};

exports.conf = {
  Aliases: [] // No Aliases.
};