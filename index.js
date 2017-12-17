// RHG#0822 Discord Bot
// Date Started:    9/20/17
// Last Edited:     12/3/17
// Date Finished:   N/A (Probally will never be finished 🔫)
// ~~~~~~~~~~~~~ Little R ~~~~~~~~~~~~~

// -- Constants --
const Discord = require('discord.js');
const bot = new Discord.Client();

// -- Gather commands --
bot.commands = new Discord.Collection();
require('fs').readdir("./commands", (err, files) => {
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  })
})

// -- Event Handle --
require('./util/eventLoad')(bot);

// -- Login --
bot.login(require("./config.json").keys ? require("./config.json").keys.token : process.env.token)