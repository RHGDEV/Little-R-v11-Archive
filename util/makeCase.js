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
      channelNames.forEach(async (cname, i) => {
        if (channel.name.includes(`-${channelNames[i]}`)) {
          logchannel = id
        } else if (channel.name.includes(`${channelNames[i]}-`)) {
          logchannel = id
        } else if (channel.name.includes(channelNames[i])) {
          logchannel = id
        };
      })
    };;
  });

  if (logchannel == 0) {
    message.channel.send(`The action you just did wasn't logged, because no log channel was found!`).then(m => m.delete(25000))
    return;
  }

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

  bot.channels.get(logchannel).send({ embed });
};

module.exports = {
  makeCase
};