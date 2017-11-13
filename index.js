// RHG#0822's Discord Bot (WHITELIST USE ONLY)
// Date Started:    9/20/17
// Last Edited:     11/10/17
// Date Finished:   N/A
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
bot.on(`guildMemberAdd`, member => require("./events/guildMemberAdd.js")(bot, member));
bot.on(`guildCreate`, (guild) => require("./events/guildCreate.js")(bot, guild));

// -- Login --
bot.login(process.env.token)
