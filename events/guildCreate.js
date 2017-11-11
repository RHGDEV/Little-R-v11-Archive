const config = require("../config.json");
const whiteList = config.whitelistedServers

module.exports = (bot, guild) => {

  var allowedServer = false
  whiteList.forEach(async(id) => {
    if (guild.id == id) {
      allowedServer = true
    };
  });
  if (!allowedServer) {
    console.log(`[LEFT] ${guild.name}, ${guild.id} due to whitelist`)
    guild.leave()
    return;
  }
};
