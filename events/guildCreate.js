const config = require("../config.json");
const whiteList = config.whiteList

module.exports = (bot, guild) => {

if (whiteList.whitelist == true) {
  var allowedServer = false
  whiteList.whitelistedServers.forEach(async(id) => {
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
  
};
