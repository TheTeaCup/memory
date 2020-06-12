      /* Levling Database */
  const db = require("quick.db");
  const points = new db.table('POINTS');
  const levels = new db.table('LEVELS');
  const xpl = new db.table("TOTAL_POINTS");
  const cooldown = require("./CoolDown.js");
  const Bumper = require('./MemoryClient.js');

console.log("(Bot) Leveling up!")

Bumper.on("message", async message => {
   if (message.author.bot) return undefined;
   if (message.channel.type != "text") return undefined;
    
      /* Leveling */
    
  let lvling = await db.fetch(`leveling_${message.guild.id}`);
  if(!lvling)return //console.log(`Leveling is disabled! ${message.guild.name}(${message.guild.id})`);
     
  let user = message.author.id;

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  
   levels.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null || i === 0) levels.set(`${message.guild.id}_${message.author.id}`, 1);
  });
  
  points.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null) points.set(`${message.guild.id}_${message.author.id}`, 0);
  });
  
  xpl.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null) xpl.set(`${message.guild.id}_${message.author.id}`, 0);
  });
  
  if (!cooldown.is(user.id)) {
  if(message.author.id !== "338192747754160138"){
  cooldown.add(user.id);
  };
    
  points.add(`${message.guild.id}_${message.author.id}`, xpAdd);
  xpl.add(`${message.guild.id}_${message.author.id}`, xpAdd);
    setTimeout(() => {
      cooldown.remove(user.id);
    }, 1000 * 60);
  };
    
  points.fetch(`${message.guild.id}_${message.author.id}`).then(p => {
    levels.fetch(`${message.guild.id}_${message.author.id}`).then(async l => {
      var xpReq = l * 300;
      if(p >= xpReq ) {
        levels.add(`${message.guild.id}_${message.author.id}`, 1);
        points.set(`${message.guild.id}_${message.author.id}`, 0);
        levels.fetch(`${message.guild.id}_${message.author.id}`, {"target": ".data"}).then(async lvl => {
          let up = new Discord.RichEmbed()
          .setTitle("Level Up!")
          .setDescription("You have just leveled to level **" + lvl + "**")
          .setColor(Bumper.Color)
          
             let lvlChannel = await db.fetch(`levelingChannel_${message.guild.id}`);
             if(lvlChannel) {
             let chan = message.guild.channels.find("name", lvlChannel)
             if(!chan)return;
               let lvlup = new Discord.RichEmbed()
               .setTitle("Level Up!")
               .setDescription(`${message.author.tag} Just Leveled up to level **${lvl}**`)
               .setColro(Bumper.Color)
              chan.send(lvlup)
             } else {
            message.channel.send(up);
          };
        });
      };
    });
  }); 
});
