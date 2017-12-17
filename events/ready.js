const config = require("../config.json");

const whiteList = config.whitelist

module.exports = (bot) => {
  console.log(`Loaded commands!\n`);
  console.log(`~ Prefix: ${config.default.prefix}`);
  console.log(`~ Whitelist: ${config.whitelist.whitelist}`)
  console.log(`~ Premium: ${config.premium.premium}\n`)

  console.log(`~ ${bot.guilds.array().length} Guild${bot.guilds.array().length > 1?"s":""}`)
  console.log(`~ ${bot.channels.array().length} Channel${bot.channels.array().length > 1?"s":""}`)
  console.log(`~ ${bot.users.array().length} User${bot.users.array().length > 1?"s":""}\n`)
  //bot.user.setGame(`Loading ${bot.user.username}... | littler.tk`)
  bot.user.setGame(`${config.default.prefix}help | https://littler.tk`)
//bot.user.setActivity('RHG', {type: "WATCHING"});

  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  console.log(`${bot.user.username} loaded!\n`)

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
      }
    });
  }

  return; // vvv About to toss this out vvv

  //Status Rotator
  gameval = 0
  setInterval(() => {
    if (gameval == config.status.length) {
      gameval = 0
    }
    var game = config.status[gameval]
    //bot.user.setGame(`${config.default.prefix}help | littler.tk | ${game}`)
    //console.log(`Change staus: ${game} ${gameval}/${config.status.length}`)
    gameval++
  }, 60000) // One min

};