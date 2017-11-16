const config = require("../config.json");
const fs = require("fs");
var prefix = config.prefix
const commandCategories = ["Moderation", "Info", "Fun"]


module.exports.run = (bot, message, args) => {

  //message.channel.send("The help command is currently in the works, but i'm a bot by RHG meant for his discord. I'm still in the works as of now, sorry!")
  //return;

  if (!args[0]) {
    fs.readdir("./commands/", (err, files) => {
      var msgA = [];
      var count = 0
      var commandNames = Array.from(bot.commands.keys());
      var longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      if (err) return console.log(err);
      msgA.push(`= Help Menu =\n[use ${config.prefix}help <command name> to get more information]\n`);

      let jsfiles = files.filter(f => f.split(".").pop() === "js");
      commandCategories.forEach((cate, i) => {
        msgA.push(`= ${cate} =`)
        jsfiles.forEach((f, i) => {
          let p = require(`../commands/${f}`);
          if (p.settings.category == cate) {
            if (p.settings.permission.toLowerCase() !== "creator") {
              msgA.push(`${prefix}${p.help.name}${' '.repeat(longest - p.help.name.length)}  ::  ${p.help.information}`);
              count++
            }
          }
        });
        msgA.push(`~ ${count}\n`)
        count = 0
      });
      message.channel.send(msgA, {code: 'asciidoc'}).then(m => m.delete(25000))
      msgA = []
      if (message.author.id == config.creatorid) {
        msgA.push(`= **CREATOR ONLY** =\n`)
        jsfiles.forEach((f, i) => {
          let p = require(`../commands/${f}`);
          if (p.settings.permission.toLowerCase() == "creator") {
            msgA.push(`${prefix}${p.help.name}${' '.repeat(longest - p.help.name.length)}  ::  ${p.help.information}`);
            count++
          }
        });
        msgA.push(`~ **${count} total**\n`)
        message.channel.send(msgA).then(m => m.delete(25000))
      }
      message.channel.send(`Discord Bot by RHG#0822`).then(m => m.delete(25000))
    });;
  } else {
    let cmd = args[0];
    fs.readdir("./commands/", (err, files) => {
      var msgB = [];
      if (err) return console.log(err);

      let jsfiles = files.filter(f => f.split(".").pop() === "js");
      jsfiles.forEach((f, i) => {
        let p = require(`../commands/${f}`);
        if (p.help.name == cmd.toLowerCase()) {
          if (p.settings.permission.toLowerCase() == "creator") {
            if (message.author.id !== config.creatorid) return
          }
          if (p.settings.permission.toLowerCase() == "offline") return
          msgB.push(`= **Help menu for ${p.help.name} ** =\n`);
          msgB.push(`**Usage:** ${config.prefix}${p.help.name} ${p.help.usage}`)
          msgB.push(`**Infomation:** ${p.help.information}`)
          msgB.push(`**Permissions:** ${p.settings.permission}+`)
          var Perms = "No"
          if (p.settings.permission.toLowerCase() == "creator") {
            if (message.author.id == config.creatorID) {
              Perms = "Yes"
            }
          }

          if (p.settings.permission.toLowerCase() == "admins") {
            if (message.member.roles.some(r => ["RHG", "Admin"].includes(r.name))) {
              Perms = "Yes"
            };
          }
		  if (p.settings.permission.toLowerCase() == "all") {
            Perms = "Yes"
          }
          msgB.push(`**Permission To Use:** ${Perms}`)
          msgB.push(`\nDiscord Bot by RHG#0822`)
          message.channel.send(msgB).then(m => m.delete(25000))

        }
      });
    });
  };
}

module.exports.help = {
  name: "oldhelp",
  usage: `(commandname)`,
  information: "Sends this message or sends more information on a command.",
  category: ""
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
}
