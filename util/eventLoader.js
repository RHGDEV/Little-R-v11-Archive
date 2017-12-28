const { eventlogger } = require("./eventLogger.js")

module.exports = (bot, db) => {

  // DEBUGGING
  bot.on(`error`, (error) => {
    console.log(error)
    eventlogger(bot, `**ERROR**\n\n${error}`)
  });
  bot.on(`warn`, (warn) => {
    console.log(warn)
    eventlogger(bot, `**WARN**\n\n${warn}`)
  });
  //bot.on(`debug`, (debug) => console.log(debug));
  bot.on(`disconnect`, () => {
    console.log(`Client connection attempts: FAILD`)
    eventlogger(bot, `**Connection Attempts**\n\nFAILED`)
  });
  bot.on(`resume`, (replayed) => {
    console.log(`Client connection attempts: Resume (${replayed})`)
    eventlogger(bot, `**Connection Attempts**\n\nReconnecting... [${replayed}]`)
  });
  bot.on(`reconnecting`, () => {
    console.log(`Client connection attempts: Reconnecting...`)
    eventlogger(bot, `**Connection Attempts**\n\nReconnecting...`)
  });

  // NORMAL
  bot.on(`ready`, () => require("../events/ready.js")(bot));

  //MESSAGES
  bot.on(`message`, (msg) => require("../events/message.js")(bot, db, msg));
  bot.on(`message`, (msg) => require("../musicbot/musicHandle.js")(bot, db, msg));

  // GUILDS
  // Members
  bot.on(`guildMemberAdd`, (member) => require("../events/guildMemberAdd.js")(bot, member));
  bot.on(`guildMemberRemove`, (member) => require("../events/guildMemberRemove.js")(bot, member));
  // Bans
  //bot.on(`guildBanAdd`, (guild, member) => require("../events/guildBanAdd.js")(bot, guild, member));
  //bot.on(`guildBanRemove`, (guild, member) => require("../events/guildBanRemove.js")(bot, guild, member));
  // Guild Handler
  bot.on(`guildCreate`, (guild) => require("../events/guildCreate.js")(bot, guild));
  bot.on(`guildDelete`, (guild) => require("../events/guildDelete.js")(bot, guild));
  // ETC
  bot.on(`guildMembersChunk`, (members, guild) => require("../events/guildMembersChunk.js")(bot, members, guild));
  bot.on(`guildUnavailable`, (guild) => console.log(`${guild.name}, (${guild.id})  has became unavailable!`));




};