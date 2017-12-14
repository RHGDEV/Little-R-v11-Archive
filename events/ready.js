const config = require("../config.json");

const whiteList = config.whitelist

module.exports = (bot) => {
  console.log(`Loaded commands!\n`);
  console.log(`~ Prefix: ${config.default.prefix}`);
  console.log(`~ ${bot.guilds.array().length} Guilds ${bot.channels.array().length} Channels ${bot.users.array().length} Users\n`)
 // bot.user.setGame(`Loading ${bot.user.username}... | littler.tk`)
  bot.user.setGame(`l;help | littler.tk`)
  
  // Whitelist
  if (whiteList.whitelist == true) {
    bot.guilds.forEach(async (guild, id) => {
      var allowedServer = false
      whiteList.whitelistedServers.forEach(async (id) => {
        if (guild.id == id) {
          allowedServer = true
        };
      });
      if (!allowedServer) {
        console.log(`[LEFT] [#${guild.memberCount}] ${guild.name}, ${guild.id} due to whitelist`)
        guild.leave()
      } else {
        console.log(`[SERVER] [#${guild.memberCount}] ${guild.name}, ${guild.id} | Joined: ${guild.joinedAt.toString()}`)
      }
    });
  }
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  console.log(`${bot.user.username} loaded!\n`)

  //FIX SOON
  return
  //Status Rotator
  gameval = 0
  setInterval(() => {
    if (gameval == config.status.length) {
      gameval = 0
    }
    var game = config.status[gameval]
    bot.user.setGame(`${config.default.prefix}help | littler.tk | ${game}`)
    //console.log(`Change staus: ${game} ${gameval}/${config.status.length}`)
    gameval++
  }, 60000) // One min

};
