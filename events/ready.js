const config = require("../config.json");
const pak = require("../package.json")
const whiteList = config.whitelist

module.exports = (bot) => {

  let status = {
    "status": [
      "Making a comeback!",
      "https://LittleR.tk",
      `V${pak.version}`,
      `${bot.guilds.array().length} server${bot.guilds.array().length > 1?'s':''}`,
      `${bot.channels.array().length} channel${bot.channels.array().length > 1?'s':''}`,
      `${bot.users.array().length} user${bot.users.array().length > 1?'s':''}`
    ],

    "time": 30
  }

  console.log(`Loaded ${bot.commands.array().length} commands!\n`);
  console.log(`~ Prefix: ${config.default.prefix}`);
  console.log(`~ Whitelist: ${config.whitelist.whitelist}`)
  console.log(`~ Premium: ${config.premium.premium}`)
  console.log(`~ Sharding: ${bot.shard?`Yes (${bot.shard.id}/${bot.shard.count})`:`No`}\n`)

  console.log(`~ ${bot.guilds.array().length} Guild${bot.guilds.array().length > 1?"s":""}`)
  console.log(`~ ${bot.channels.array().length} Channel${bot.channels.array().length > 1?"s":""}`)
  console.log(`~ ${bot.users.array().length} User${bot.users.array().length > 1?"s":""}\n`)
  //bot.user.setGame(`Loading ${bot.user.username}... | littler.tk`)
  bot.user.setGame(`${config.default.prefix}help`)
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

  // Sharding Manager
  if (bot.shard) {
    status.status.push(`${bot.shard.count} shard${bot.shard.count>1?"s":""}`)
  }

  //return; // vvv Was about to toss this out vvv

  //Status Rotator


  gameval = 0
  setInterval(() => {
    if (gameval == status.status.length) {
      gameval = 0
    }
    bot.user.setGame(`${config.default.prefix}help | ${status.status[gameval]}`)
    //console.log(`Change staus: ${game} ${gameval}/${status.length}`)
    gameval++
  }, status.time * 1000) // One min

};