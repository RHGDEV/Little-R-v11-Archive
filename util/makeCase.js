const config = require("../config.json");
const discord = require('discord.js');

let channelNames = ["audit", "log", "logs", "little-r-logs", "littler-logs"]

// Needed
// const {makeCase} = require('../util/makeCase.js');
// makeCase(bot, message, "🔨 Ban", `${reason.join(" ")}`, message.author.tag, kick.user.tag , "")

async function makeCase(bot, message, action, reaso, author, user, custom) {
  //let logchannel = await findlogChannel(message)
  let logchannel = 0
  message.guild.channels.forEach(async (channel, id) => {
    if (channel.type == "text") {
      console.log("m" + channel.name);
      channelNames.forEach(async (cname, i) => {
        console.log(i);
        if (channel.name.includes(`-${channelNames[i]}`)) {
          console.log("1" + channel.name);
          logchannel = id
        } else if (channel.name.includes(`${channelNames[i]}-`)) {
          console.log("2" + channel.name);
          logchannel = id
        } else if (channel.name.includes(channelNames[i])) {
          console.log("3" + channel.name);
          logchannel = id
        };
      })
    };;
  });
  const messages = await bot.channels.get(logchannel).fetchMessages({
    limit: 5
  });
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

  bot.channels.get(logchannel).send({
    embed
  });
};

module.exports = {
  makeCase
};
