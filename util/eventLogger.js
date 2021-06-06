/* jshint -W004 */
/* jshint -W027 */
/* jshint -W030 */

const discord = require('discord.js'),
config = require("../config.json"),
hexColors = require("../runtime/hexcolors.json");

async function eventlogger(bot, color, custom, icon) {
  //let logchannel = await findlogChannel(message)
  let logchannel = config.default.eventChannel;
  if (!logchannel | logchannel=="") {
    return console.log("No Channel to log events");
  } else if (bot.user.id == "378382335701417987") {
    return console.log("Little R BETA version cannot send logs.");
  }
 // return;
  if (custom.length > 1990) return console.log("Too long to send to discord.");
  if (custom.includes(bot.token)) custom = custom.replace(bot.token, '');
  var color = hexColors[color.toLowerCase()];
  if (!color) color = "7289DA";
  const messages = await bot.channels.get(logchannel).fetchMessages({ limit: 5 });

  const log = messages.filter(m => m.author.id === bot.user.id &&
    m.embeds[0] &&
    m.embeds[0].type === 'rich' &&
    m.embeds[0].footer &&
    m.embeds[0].footer.text.startsWith('Event')
  ).first();

  var thisCase = 0;
  var foot = ``;

  if (log) {
    thisCase = /Event\s(\d+)/.exec(log.embeds[0].footer.text);
    foot = `Event ${parseInt(thisCase[1]) + 1}`;
  } else {
    foot = `Event 1`;
  }

  const thumburi = icon || "";

  let embed = new discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${bot.user.username} Event Logger ✍`)
    .setColor(color)
    .setDescription(custom)
    .setThumbnail(thumburi)
    .setFooter(foot, bot.user.avatarURL);

  bot.channels.get(logchannel).send({ embed }).then(() => {
      console.log("Event logger success!");
    })
    .catch(() => {
      console.log("Event logger faild!");
    });
}

module.exports = {
  eventlogger
};