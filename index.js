// Rusty's Discord Bot (WHITELIST USE ONLY)
// Date Started:    9/20/17
// Last Edited:     11/24/17
// Date Finished:   N/A (Probally will never be finished 🔫)
// ~~~~~~~~~~~~~ Little R ~~~~~~~~~~~~~

// -- Constants --
const Discord = require('discord.js');
const bot = new Discord.Client();

// -- Gather commands --
bot.commands = new Discord.Collection();
require('fs').readdir("./commands/", (err, files) => {
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  })
})

// -- Handles --
bot.on(`ready`, () => require("./events/ready.js")(bot));
bot.on(`message`, (msg) => require("./events/message.js")(bot, msg, bot.commands));
bot.on(`message`, (msg) => require("./musicbot/musicHandle.js")(bot, msg));
bot.on(`guildMemberAdd`, (member) => require("./events/guildMemberAdd.js")(bot, member));
bot.on(`guildMemberRemove`, (member) => require("./events/guildMemberRemove.js")(bot, member));
bot.on(`guildBanRemove`, (guild, member) => require("./events/guildBanRemove.js")(bot, guild, member));
bot.on(`guildCreate`, (guild) => require("./events/guildCreate.js")(bot, guild));
bot.on(`guildDelete`, (guild) => require("./events/guildDelete.js")(bot, guild));

// -- Login --
bot.login(require("./config.json").token ? require("./config.json").token : process.env.token)
