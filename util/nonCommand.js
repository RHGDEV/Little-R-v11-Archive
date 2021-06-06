const config = require("../config.json"),
  discord = require('discord.js'),
  checkPerm = require("../util/permissions.js"),
  {
    makeCase
  } = require('../util/makeCase.js');
var spam = {};

module.exports = (bot, message) => {
  // Handle mentions
  if (message.content.startsWith(`<@${bot.user.id}>`) ) {
    let mentionembed = new discord.RichEmbed()
      .setColor(message.guild.me.displayHexColor != '#000000' ? message.guild.me.displayHexColor : "7289DA")
      .setAuthor(`${bot.user.username} Mention Help`, bot.user.avatarURL)
      .setDescription(`<@${message.author.id}>, Yes I'm Little R!\nHow may I help you?\nI'm a very powerful bot made by <@140487710727995392>\nYou may run the help menu for more help ==> [${config.default.prefix}help](https://littler.tk/commands)`);

    message.channel.send({
      embed: mentionembed
    });
  }

  // Handle photos
  // if (message.channel.name == "photos") {
  //   if (message.attachments.size === 0 && checkPerm(bot, message, "admins", false) == false) {
  //     message.channel.send(`<@${message.author.id}>, You're not allowed to talk in a photo only channel!`).then(m => m.delete(10000));
  //     message.delete(2500);
  //     return;
  //   }
  // }

  // Handle spam

  // if (!spam[message.author.id]) {
  //   spam[message.author.id] = {
  //     count: 1,
  //     warns: 0
  //   };
  // }
  // spam[message.author.id].count++;

  // console.log(spam[message.author.id].count, spam[message.author.id].warns);

  // if (spam[message.author.id].count > 2) {
  //   spam[message.author.id].warns++;
  //   spam[message.author.id].count = 0;
  //   makeCase(bot, message, "👿👿👿 Spamming", `Automod`, `${bot.user.username}`, message.author.tag, `**Warnings:** ${spam[message.author.id].warns}`);
  //   message.channel.fetchMessages({
  //     limit: 3
  //   }).then(m => message.channel.bulkDelete(m));
  //   let warnembed = new discord.RichEmbed()
  //     .setColor("7289DA")
  //     .setAuthor(`${bot.user.username} No-Spam`, bot.user.avatarURL)
  //     .setDescription(`<@${message.author.id}>, I don't really like spam.\nSo I gave you ${spam[message.author.id].warns<2?"a":"another"} warning.`);

  //   message.channel.send({
  //     embed: warnembed
  //   });

  // } else if (spam[message.author.id].warns > 2) {
  //   spam[message.author.id].warns = 0;
  //   spam[message.author.id].count = 0;
  //   makeCase(bot, message, "👿 Spam-Mute", `Automod`, `${bot.user.username}`, message.author.tag);
  //   var muteRole = message.guild.roles.find("name", "Muted");
  //   if (!muteRole) {
  //     message.channel.send(`ERROR :x: Couldn't mute because no "Muted" role was found.`).then(m => m.delete(5000));
  //   } else {
  //     message.member.addRole(muteRole.id);
  //   }
  //   let muteembed = new discord.RichEmbed()
  //     .setColor("7289DA")
  //     .setAuthor(`${bot.user.username} No-Spam`, bot.user.avatarURL)
  //     .setDescription(`<@${message.author.id}>, I don't really like spam.\nSo since I gave you some warnings I have muted you.`);

  //   message.channel.send({
  //     embed: muteembed
  //   });
  // }

  // setTimeout(() => {
  //   if (spam[message.author.id].count > 0) {
  //     spam[message.author.id].count--;
  //   }
  // }, 2000);

  // Handle Muted Users.
  // if (message.channel.name == "photos") {
  //   if (message.attachments.size === 0 && checkPerm(bot, message, "admins", false) == false) {
  //     message.channel.send(`<@${message.author.id}>, You're not allowed to talk while your muted!`).then(m => m.delete(10000));
  //     message.delete(2500);
  //     return;
  //   }
  // }


};