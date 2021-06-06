const config = require("../config.json"),
pak = require("../package.json"),
whiteList = config.whitelist,
{ eventlogger } = require("../util/eventLogger.js");

module.exports = (bot) => {
  eventlogger(bot, "green", `
***__Bot Online__***\n\n
• **Version:** ${pak.version}
• **Commands:** ${bot.commands.array().length}
• **Prefix**: ${config.default.prefix}
• **Whitelist:** ${config.whitelist.whitelist}
• **Premium:** ${config.premium.premium}
• **Sharding:** ${bot.shard?`Yes (${bot.shard.id}/${bot.shard.count})`:`No`}
• **Guild${bot.guilds.array().length > 1?"s":""}:** ${bot.guilds.array().length}
• **Channel${bot.channels.array().length > 1?"s":""}:** ${bot.channels.array().length}
• **User${bot.users.array().length > 1?"s":""}:** ${bot.users.array().length} `);

  console.log(`Loaded ${bot.commands.array().length} commands!\n`);
  console.log(`• Prefix: ${config.default.prefix}`);
  console.log(`• Whitelist: ${config.whitelist.whitelist}`);
  console.log(`• Premium: ${config.premium.premium}`);
  console.log(`• Sharding: ${bot.shard?`Yes (${bot.shard.id}/${bot.shard.count})`:`No (0/0)`}`);
  console.log(`• ${bot.guilds.array().length} Guild${bot.guilds.array().length > 1?"s":""}`);
  console.log(`• ${bot.channels.array().length} Channel${bot.channels.array().length > 1?"s":""}`);
  console.log(`• ${bot.users.array().length} User${bot.users.array().length > 1?"s":""}`);
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  console.log(`${bot.user.username} loaded!\n`);

  // -- Whitelist --
  if (whiteList.whitelist == true) {
    bot.guilds.forEach((guild, id) => {
      var allowedServer = false;
      whiteList.whitelistedServers.forEach((id) => {
        if (guild.id == id) {
          allowedServer = true;
        }
      });
      if (!allowedServer) {
        console.log(`[LEFT] [#${guild.memberCount}] ${guild.name}, ${guild.id} due to whitelist`);
        guild.leave();
      }
    });
  }

  // -- Status Rotator --
  require('../runtime/playing.js')(bot);
  
  //dbl Stats
  if (process.env.dbs) { 
  require("snekfetch").post(`https://discord.bots.gg/api/v1/bots/360578020492312576/stats`).set('Authorization', process.env.dbs).send({ guildCount: bot.guilds.size })
      .then((b) => { console.log('[discord.bots.gg] Posted!'); console.log(b.body) })
}

};