// Little R (Discord Bot)
// Date Started:    9/20/17
// Last Edited:     5/29/18
// Date Finished:   N/A (Probally will never be finished 🔫)
// ~~~~~~~~~~~~~ Little R ~~~~~~~~~~~~~

// -- Constants --
const Discord = require('discord.js'),
bot = new Discord.Client({
  messageCacheMaxSize: 10, messageSweepInterval: 2600,
     ws: {properties: { $browser: 'Discord Android'} }
}),
db = require('mongoose');

// -- Gather commands --
bot.commands = new Discord.Collection();
require('fs').readdir("./commands", (err, files) => {
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name.toLowerCase(), require(`./commands/${f}`));
    //console.log(`• ${i}: ${require(`./commands/${f}`).help.name}`);
  });
});

// -- Login --
//db.connect(`mongodb://${process.env.mongodbuser ? process.env.mongodbuser : require("./config.json").keys.mongodbuser}:${process.env.mongodbpass ? process.env.mongodbpass : require("./config.json").keys.mongodbpass}@ds239557.mlab.com:39557/little-r-db`);
//db.connect(`mongodb://${require("./config.json").keys.mongodbuser}:${require("./config.json").keys.mongodbpass}@littler-shard-00-00-iuzjw.mongodb.net:27017/guilds?ssl=true&replicaSet=LittleR-shard-0&authSource=admin&retryWrites=true`)
bot.login(process.env.token ? process.env.token : require("./config.json").keys.token);
const DBL = require("dblapi.js");

if (process.env.dbl) { const dbl = new DBL(process.env.dbl, bot);}

// -- Event Loader --
require('./util/eventLoader.js')(bot, db);

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);