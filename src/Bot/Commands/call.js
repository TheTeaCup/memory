const Discord = require("discord.js");
const Quick = require("quick.db");
const Phone = require('../Handlers/Phone.js');
const Utils = require('../Handlers/Utils.js');
const User = require('../Handlers/User.js');
const {Confirmation, Pagination} = require('discord-interface');

exports.run = async(Memory, mes, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = "m-"
  
  console.log(mes.channel.type)
        if (!mes.channel.type == "dm") return mes.channel.send(`:no_entry: You need to execute this command in the private messages.`);

        if (!await Phone.hasPhone(mes.author.id)) return mes.channel.send(`:no_good: You don't have a phone number. Create one using \`${prefix}createphone\``);

        let phoneNumber = await Phone.validatePhoneNumber(args[0]) ? args[0] : await Phone.getContact(mes.author.id, args[0]);
        if (!phoneNumber) return mes.channel.send(`:no_good: That's not a valid phone number.`);

        let receiverPhone = await Phone.getByPhoneNumber(phoneNumber);
        let receiver = Memory.users.get(receiverPhone.userID);

        if (await User.isInCall(mes.author.id)) return mes.channel.send(`:no_good: You are currently in a phone call.`);

        if (!receiver) return mes.channel.send(`:cry: Sorry! **${phoneNumber}** is unreachable.`);
        if (receiver.id == mes.author.id) return mes.channel.send(`:thinking: Do you want to call yourself? Are you that lonely?`);
        if (!await Phone.canCall(receiver.id, mes.author.id)) return mes.channel.send(`:cry: Sorry! The person you tried to call is currently unavailable.`);

        try {
            await receiver.createDM();
        } catch (err) {
            return mes.channel.send(`:cry: Sorry! The person you tried to call is currently unavailable.`);
        }

        let caller = await Phone.getByUserID(mes.author.id);

        mes.channel.send(`:iphone: You started calling \`${phoneNumber}\``);

        let message = await receiver.send(new Discord.RichEmbed()
            .setDescription(`${caller.anonymous ? 'An anonymous caller' : `**${mes.author.username}**`} is calling you. Do you accept it?`)
            .setColor(Memory.Color)
            .setFooter(`You have 2 minutes to accept it.`)
        );

        let reactions = ['✅', '❎'];

        let filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id == receiver.id;
        message.awaitReactions(filter, {time: 120000, max: 1}).then(async collected => {
            let accepted = !!collected.get('✅');
            let timeOver = !accepted && !collected.get('❎');

            await message.delete();

            if (accepted) {
                if (await User.isInCall(receiver.id) || await User.isInCall(mes.author.id)) return;

                let startTime = Date.now();

                mes.author.send(`**${receiver.username}** accepted your call. Hang up any time sending \`hang up\``),
                receiver.send(`You started a call with ${caller.anonymous ? 'an anonymous caller' : `**${mes.author.username}**`}. Hang up any time sending \`hang up\``)
                
                let users = [mes.author, receiver];

                for (let user of users) await User.toggleInCall(user.id, true);
                
                let collectors = users.map(user => {
                    let filter = message => message.author.id == user.id;
                    return user.dmChannel.createMessageCollector(filter);
                });

                for (let index = 0; index < users.length; index++) {
                    let user = users[index];
                    let otherUser = users[(index + 1) % 2];

                    let collector = collectors[index];

                    collector.on('collect', async message => {
                        if (message.content.toLowerCase() == 'hang up') {
                            let callTime = Date.now() - startTime;
                            users.forEach(user => user.send(`The call has ended and lasted for \`${Utils.format(callTime / 1000)}\``));

                            for (let user of users) {
                                await Promise.all([User.toggleInCall(user.id, false), Phone.addToHistory(user.id, index == 0 && caller.anonymous ? 'Anonymous' : user.username, callTime / 1000)]);
                            }

                            return collectors.forEach(collector => collector.stop());
                        }

                        let prefixMessage = `***${index == 0 && caller.anonymous ? 'Anonymous' : user.username}:*** `;
                        otherUser.send(prefixMessage + message.content.slice(0, 2000 - prefixMessage.length));
                    });
                }
            } else if (timeOver) {
                let text = `:cry: Your call exceded the response time. Do you want to leave a voicemail?`;
                let confirmation = createConfirmation({text, userID: mes.author.id, embedColor: Memory.Color});

                confirmation.on('confirmation', async confirmed => {
                    if (confirmed) {
                        mes.channel.send(`:telephone: Write down a message:`);
                        
                        let filter = message => message.author.id == mes.author.id;
                        mes.author.dmChannel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
                            let content = collected.first().content;

                            let prefix = `${caller.anonymous ? 'An anonymous caller' : `**${mes.author.username}**`} left you a message: `;
                            receiver.send(prefix + content.slice(0, 2000 - prefix.length));

                            mes.channel.send(`:white_check_mark: You have sent a voicemail.`);
                        }).catch(() => mes.channel.send(`:no_good: Your voicemail time is over.`));
                    } else {
                        let phone = await Phone.getByUserID(mes.author.id);
                        receiver.send(`:iphone: The \`${phone.id}\` phone number tried to call you.`);
                    }
                });

                confirmation.on('over', async timeOver => {
                    if (timeOver) {
                        let phone = await Phone.getByUserID(mes.author.id);
                        receiver.send(`:iphone: The \`${phone.id}\` phone number tried to call you.`);
                    }
                });
            } else {
                mes.channel.send(`:cry: The person you tried to call rejected your call.`);
            }
        }).catch(async err => {
            console.log(err);

            if (!message.deleted) await message.delete();
            mes.channel.send(`:no_good: An unexpected error has occurred. Try again.`);
        });

        for (let reaction of reactions) await message.react(reaction);
  
     async function createConfirmation(options) {
        let confirmation = Confirmation.create(mes, options);
        return confirmation;
    }
  
    }

exports.help = {
  name: "call",
  description: "Call someone from your contact list or by the phone numbe",
  usage: "call <phone-number|contact-name>",
  catagory: "Phone"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};
