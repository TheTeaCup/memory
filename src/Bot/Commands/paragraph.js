const Discord = require("discord.js");
const Quick = require("quick.db");
const Tools = require("../Handlers/Generator.js");

module.exports.run = async (Memory, message, args) => { // eslint-disable-line no-unused-vars

  let submitted = await Quick.fetch(`newParagraph_${message.author.id}`);
  let id = await Quick.fetch(`keyParagraph_${message.author.id}`);
  let options = [ "Do \`m-Paragraph new\` To create your own.\nDo \`m-Paragraph view\` To write someone a Paragraph" ];
  
  console.log(args[0])

  if(args[0] === "view"){
    
  let dataEmbed = new Discord.RichEmbed()
  .setTitle("Paragraphs not Done")
  .setColor(Memory.Color)
  .setDescription(`Visit [Here](https://project-memory.glitch.me/paragraphs/) to see.`)
  return message.channel.send(dataEmbed);
    
  };
  
  if(args[0] === "new"){
  if(submitted === 1){ return message.channel.send("You have already created a paragraph." + `\n View Here : ${Memory.Website}/paragraphs/${id}/`); }else{
    
    let Key = await Tools.generateKey("entries");
    Quick.set(`newParagraph_${message.author.id}`, 1);
    Quick.set(`keyParagraph_${message.author.id}`, Key)
    Memory.paragraphs.push("para", Key);
    Memory.queuePara.push("queued", Key)
    
    Memory.paraUsers.set(Key, message.author.id, "users");
    Memory.userParagraphs.set(message.author.id, [], "userParagraphs");
    Memory.userParagraphs.push(message.author.id, Key, "userParagraphs")
    
    let sub = new Discord.RichEmbed()
    .setTitle("Paragraph Created")
    .setColor(Memory.Color)
    .setDescription(`To view the progress of your Paragraph vist: [Me](${Memory.Website}/paragraphs/${Key}/). And to also see if anyone is replying!`)
    .setFooter("This could take a while.")
    return message.channel.send(sub);
    
    };
  };
  
  let para = new Discord.RichEmbed()
  .setTitle("Paragraph Options")
  .setColor(Memory.Color)
  .setDescription(`${options}`)
  message.channel.send(para);
  
};

exports.help = {
  name: "paragraph",
  description: "Write someone a paragraph.",
  usage: "paragraph",
  catagory: "Fun"
};

exports.conf = {
  Aliases: [ "para" ]
};