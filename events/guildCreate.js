const config = require("../config.json");
const whiteList = config.whitelist
const { eventlogger } = require("../util/eventLogger.js")

module.exports = (bot, guild) => {
  console.log(`[JOIN] [#${guild.memberCount}] ${guild.name}, ${guild.id}`)
  eventlogger(bot, `**Guild Join**\n\n**Guild:** ${guild.name}\n**Owner:** ${guild.owner.user.tag}\n**Large:** ${guild.large}\n**Member Count:** ${guild.memberCount}\n\n**Total Guilds:** ${bot.guilds.array().length}`, guild.iconURL)


  if (whiteList.whitelist == true) {
    var allowedServer = false
    whiteList.whitelistedServers.forEach(async (id) => {
      if (guild.id == id) {
        allowedServer = true
      };
    });
    if (!allowedServer) {
      console.log(`[LEFT] [#${guild.memberCount}] ${guild.name}, ${guild.id} due to whitelist`)
      guild.leave()
      return;
    } else {
      console.log(`[SERVER] [#${guild.memberCount}] ${guild.name}, ${guild.id} | Joined: ${guild.joinedAt.toString()}`)
    }
  }
};