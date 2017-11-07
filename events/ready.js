const config = require("../config.json");
const whiteList = config.whitelistedServers

module.exports = (bot) => {
  console.log(`~~~~~~~~~~~~~~~  ${bot.user.username}  ~~~~~~~~~~~~~~~`);
  console.log(``);
  console.log(`~ Bot Name: ${bot.user.username}`);
  console.log(`~ Prefix: ${config.prefix}`);
  console.log(`~ Serving: ${bot.guilds.array().length} guild(s)`)
  console.log(`~ Bot id: ${bot.user.id}`)
  console.log(``);
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  console.log(``);
  console.log(``);
  bot.user.setGame(`Little R | Loading...`)

  // Whitelist
  bot.guilds.forEach(async(guild, id) => {
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
    } else {
      console.log(`[SERVER] [#${guild.memberCount}] ${guild.name}, ${guild.id} | Joined: ${guild.joinedAt.toString()}`)
    }
  });
  console.log(``)

  // Status Rotator
  gameval = 0
  setInterval(() => {
    if (gameval == config.statues.length) {
      gameval = 0
    }
    var game = config.statues[gameval]
    bot.user.setGame(`${config.prefix}help | ${game}`)
    //console.log(`Change staus: ${game} ${gameval}/${config.statues.length}`)
    gameval++
  }, 60000) // One minuet

};
