const config = require("../config.json");
const discord = require('discord.js');
const profanities = require('../profanities.json');
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
        .setAuthor(`${bot.user.username} Mention`, bot.user.avatarURL)
        .setDescription(`<@${message.author.id}>, Yes I'm Little R!\nHow may I help you?\nA very powerful bot made by <@140487710727995392>\nYou may run the help menu for more help ==> [${config.prefix}help](https://littler.tk/commands)`)


      message.channel.send({embed: mentionembed}).then(m => m.delete(50000))
      message.delete(2500)
    }
  }


  // for (x = 0; x < profanities.length; x++) {
  //   if (message.cleanContent.toLowerCase().includes(profanities[x].toLowerCase())) {
  //     // if (message.content.toLowerCase() == profanities[x].toLowerCase()) {
  //     console.log(`[Profanity] ${message.author.username}, said ${profanities[x]} in the ${message.channel.name} channel!`)
  //     makeCase(bot, message, "Profanity", `Auto-Mod`, bot.user.tag, message.author.tag, `**Said:** ${profanities[x]}\n**Message:** ${message.content}`)
  //     message.channel.send(`<@${message.author.id}>, Please do not use profanity in this server!`).then(m => m.delete(10000))
  //     message.delete(500)
  //     return;
  //   };
  // };
};
