const discord = require('discord.js');
const config = require("../config.json")

async function eventlogger(bot, custom, icon) {
  //let logchannel = await findlogChannel(message)
  let logchannel = config.default.eventChannel
  if (!logchannel) return console.log("No Channel to log events");

  const messages = await bot.channels.get(logchannel).fetchMessages({ limit: 5 })

  const log = messages.filter(m => m.author.id === bot.user.id &&
    m.embeds[0] &&
    m.embeds[0].type === 'rich' &&
    m.embeds[0].footer &&
    m.embeds[0].footer.text.startsWith('Case')
  ).first();

  var thisCase = 0
  var foot = ``

  if (log) {
    thisCase = /Case\s(\d+)/.exec(log.embeds[0].footer.text);
    foot = `Case ${parseInt(thisCase[1]) + 1}`
  } else {
    foot = `Case 1`
  }

  const thumburi = icon || ""

  let embed = new discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${bot.user.username} Event Logger ✍`, bot.user.avatarURL)
    .setColor("7289DA")
    .setDescription(custom)
    .setThumbnail(thumburi)
    .setFooter(foot);

  bot.channels.get(logchannel).send({ embed });
};

module.exports = {
  eventlogger
};