module.exports = bot => {
  bot.on(`ready`, () => require("../events/ready.js")(bot));
  bot.on(`error`, (error) => console.log(error));
  //bot.on(`debug`, (debug) => console.log(debug));
  bot.on(`disconnect`, () => console.log(`Client connection attempts: FAILD`));
  bot.on(`message`, (msg) => require("../events/message.js")(bot, msg, bot.commands));
  bot.on(`message`, (msg) => require("../musicbot/musicHandle.js")(bot, msg));
  bot.on(`guildMemberAdd`, (member) => require("../events/guildMemberAdd.js")(bot, member));
  bot.on(`guildMemberRemove`, (member) => require("../events/guildMemberRemove.js")(bot, member));
  bot.on(`guildBanRemove`, (guild, member) => require("../events/guildBanRemove.js")(bot, guild, member));
  bot.on(`guildCreate`, (guild) => require("../events/guildCreate.js")(bot, guild));
  bot.on(`guildDelete`, (guild) => require("../events/guildDelete.js")(bot, guild));
};