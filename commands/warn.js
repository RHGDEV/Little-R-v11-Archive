const { makeCase } = require('../util/makeCase.js'),
Discord = require('discord.js');

module.exports.run = (bot, message, args) => { //return;
  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason given.";

  if (message.mentions.users.size === 0) {
    return message.channel.send(`:question: Don't you need to mention someone?`).then(m => m.delete(2500));
  }
  let warn = message.guild.member(message.mentions.users.first());
  if (!warn) return message.channel.send(`:x: That's not a vaild user.`).then(m => m.delete(2500));
  message.channel.send(`👿 I have warned <@${warn.user.id}>\n Warned for *${reason}*`).then(m => m.delete(2500));
  makeCase(bot, message, "👿 Warning", reason, message.author.tag, warn.user.tag);
  let warnem = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Hi, ${warn.user.username}!`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`👿 You have recieved a warning!\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setTimestamp();
  warn.user.send({ embed: warnem });
};

module.exports.help = {
  name: "warn",
  usage: `[user] (reason)`,
  information: "Warn a user in the guild."
};

module.exports.settings = {
  permission: "Admins",
  deleteresponder: true,
  category: "Moderation"
};