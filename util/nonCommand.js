const config = require("../config.json");
const discord = require('discord.js');
const makeCase = require('../util/makeCase.js');

module.exports = (bot, message) => {
  if (message.channel.name == "photos") {
    if (message.attachments.size === 0) {
      message.channel.send(`<@${message.author.id}>, You're not allowed to talk in a photo only channel!`).then(m => m.delete(10000))
      message.delete(2500)
      return;
    };
  };

  if (message.mentions.members.first()) {
    if (message.mentions.members.first().id == bot.user.id) {
      let mentionembed = new discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`${bot.user.username} Mention Help`, bot.user.avatarURL)
        .setDescription(`<@${message.author.id}>, Yes I'm Little R!\nHow may I help you?\nA very powerful bot made by <@140487710727995392>\nYou may run the help menu for more help ==> [${config.default.prefix}help](https://littler.tk/commands)`)


      message.channel.send({ embed: mentionembed }).then(m => m.delete(50000))
      message.delete(2500)
    }
  }
};