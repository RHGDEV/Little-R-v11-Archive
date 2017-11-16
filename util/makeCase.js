const config = require("../config.json");
const discord = require('discord.js');

// Needed
// const {makeCase} = require('../util/makeCase.js');
// makeCase(bot, "🔨 Ban", `${reason.join(" ")}`, message.author.tag, kick.user.tag , "")

async function makeCase(bot, action, reaso, author, user, custom) {
  const messages = await bot.channels.get(config.logchannel).fetchMessages({limit: 5});
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
  const reason = reaso || `No reason given.`
  if (!custom) custom = ""
  let embed = new discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${bot.user.username} Logs ✍`, bot.user.avatarURL)
    .setColor("7289DA")
    .setDescription(`**Action:** ${action}\n**User:** ${user}\n**Moderator:** ${author}\n**Reason:** ${reason}\n${custom}`)
    .setFooter(foot);
  bot.channels.get(config.logchannel).send({embed});
};

module.exports = {makeCase};
