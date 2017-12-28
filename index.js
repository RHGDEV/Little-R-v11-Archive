// Little R (Discord Bot)
// Date Started:    9/20/17
// Last Edited:     12/24/17
// Date Finished:   N/A (Probally will never be finished 🔫)
// ~~~~~~~~~~~~~ Little R ~~~~~~~~~~~~~

// -- Constants --
const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db')
// Really need to find a online Database instead of SQL

// -- Gather commands --
bot.commands = new Discord.Collection();
require('fs').readdir("./commands", (err, files) => {
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name.toLowerCase(), require(`./commands/${f}`));
  })
})

// -- Event Loader --
require('./util/eventLoader.js')(bot, db);

// -- Login --
bot.login(process.env.token ? process.env.token : require("./config.json").keys.token)