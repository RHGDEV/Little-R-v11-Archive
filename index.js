// RHG's Personal bot
// Date Started:    9/20/17
// Last Edited:     10/21/17
// Date Finished:   N/A
// ~~~~~~~~~~~~~ Little R ~~~~~~~~~~~~~

// -- Constants --
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

// -- Gather commands --
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  var Info = 0
  var Moderation = 0
  var Fun = 0
  var CreatorONLYCMDS = 0
  var NormalCMDS = 0
  if (err) return;
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) return console.log(`~~ Can't have a bot without commands! ~~`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    if (props.settings.permission.toLowerCase() == "creator") {
      console.log(`[C] ${i + 1}:  [${props.settings.category}] ${f}`)
      CreatorONLYCMDS++
    } else {
      console.log(`[N] ${i + 1}:  [${props.settings.category}] ${f}`)
      NormalCMDS++
    }
    if (props.settings.category == "Moderation") {
      Moderation++
    } else if (props.settings.category == "Info") {
      Info++
    } else if (props.settings.category == "Fun") {
      Fun++
    };

    bot.commands.set(props.help.name, props);
  })
  console.log(``);
  console.log(`[FUN] ${Fun}`);
  console.log(`[Moderation] ${Moderation}`);
  console.log(`[Info] ${Info}`);
  console.log(`[Total] ${jsfiles.length}`);
  console.log(`[Creator] ${CreatorONLYCMDS}  |  [Normal]  ${NormalCMDS}`);
  console.log(``);
})

// -- Handles --
bot.on(`ready`, () => require("./events/ready.js")(bot));
bot.on(`message`, (msg) => require("./events/message.js")(bot, msg, bot.commands));
bot.on(`guildMemberAdd`, member => require("./events/guildMemberAdd.js")(bot, member));
bot.on(`guildCreate`, (guild) => require("./events/guildCreate.js")(bot, guild));

// -- Login --
bot.login(require("./config.json").token)
