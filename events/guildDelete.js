const { eventlogger } = require("../util/eventLogger.js")

module.exports = (bot, guild) => {
  console.log(`[LEFT] [#${guild.memberCount}] ${guild.name}, ${guild.id}`)
  eventlogger(bot, `**Guild Leave**\n\n**Guild:** ${guild.name}\n**Owner:** ${guild.owner.user.tag}\n**Large:** ${guild.large}\n**Member Count:** ${guild.memberCount}\n\n**Total Guilds:** ${bot.guilds.array().length}`, guild.iconURL)

};