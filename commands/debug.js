const discord = require('discord.js');
const pak = require("../package.json")
const config = require("../config.json")
//🔎 👤 ⚙ 🆔 📄 📝 ⌛ 🖍 🔊 📬


module.exports.run = (bot, message, args) => {
  // return; //SOON
  let guild_list = []
  bot.guilds.forEach(async (guild, id) => {
    guild_list.push(`      ${guild.name}, ${id}\n`)
  });
  let embed = new discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${bot.user.username} Debugger`, bot.user.avatarURL)
    .setColor("7289DA")
    .setDescription(`
⚙ **Bot Version:** ${pak.version}\n
👤 **Bot Name:** ${bot.user.tag}\n
🆔 **Bot ID:** ${bot.user.id}\n
🖍 **Bot Prefix:** ${config.default.prefix}\n
🚀 **Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n
🔎 **I know:**\n -   ${bot.guilds.array().length} Guild${bot.guilds.array().length > 1?"s":""}\n -   ${bot.channels.array().length} Channel${bot.channels.array().length > 1?"s":""}\n -   ${bot.users.array().length} User${bot.users.array().length > 1?"s":""}\n
⌛ **Uptime:** ${Math.round(bot.uptime / (1000 * 60 * 60))} hours, ${Math.round(bot.uptime / (1000 * 60)) % 60}  minutes, ${Math.round(bot.uptime / 1000) % 60} seconds.\n
📝 **Guilds I Know:** [#${bot.guilds.array().length}]\n${guild_list}`)
  message.channel.send({ embed }).then(m => m.delete(35000))
}

module.exports.help = {
  name: "debug",
  usage: ``,
  information: "Get infomation"
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Info"
}