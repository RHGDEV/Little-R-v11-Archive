const config = require("../config.json");
const discord = require('discord.js');
const fs = require("fs");
var prefix = config.prefix
const commandCategories = ["Moderation", "Info", "Fun"]
const commandEmojis = ["🛠", "❔", "🙃😛"]

module.exports.run = (bot, message, args) => {

  //message.channel.send("The help command is currently in the works, but i'm a bot by RHG meant for his discord. I'm still in the works as of now, sorry!")
  //return;

  if (!args[0]) {
    fs.readdir("./commands/", (err, files) => {
      var msgA = [];
      var count = 0
      if (err) return console.log(err);
     // msgA.push(`= Help Menu =\n[use ${config.prefix}help <command name> to get more information]\n`);

      let jsfiles = files.filter(f => f.split(".").pop() === "js");
      commandCategories.forEach((cate, i) => {
        msgA.push(`   -`)
        jsfiles.forEach((f, i) => {
          let p = require(`../commands/${f}`);
          if (p.settings.category == cate) {
            if (p.settings.permission.toLowerCase() !== "creator") {
              msgA.push(`   [${prefix}${p.help.name}]()  -  ${p.help.information}`);
              count++
            }
          }
        });
        let embed = new discord.RichEmbed()
  		    .setAuthor(`${cate} ${commandEmojis[i]}`, bot.user.avatarURL)
          .setDescription(msgA)
          .setColor("7289DA")
          .setFooter(`${count} | ${bot.user.username} Command List | Discord Bot by RHG#0822`)

        message.channel.send({embed: embed}).then(m => m.delete(55000))
        msgA = []
        count = 0
      });
      if (message.author.id == config.creatorid) {
        msgA.push(`   -`)
        jsfiles.forEach((f, i) => {
          let p = require(`../commands/${f}`);
          if (p.settings.permission.toLowerCase() == "creator") {
            msgA.push(`   [${prefix}${p.help.name}]()  ::  ${p.help.information}`);
            count++
          }
        });
        let embed = new discord.RichEmbed()
          .setAuthor(`CREATOR ONLY`, bot.user.avatarURL)
          .setDescription(msgA)
          .setColor("7289DA")
          .setFooter(`${count} | ${bot.user.username} Command List | Discord Bot by RHG#0822`)
        message.channel.send({embed: embed}).then(m => m.delete(55000))
      }
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
          msgB.push(`   -`)
          msgB.push(`  **Usage:** ${config.prefix}${p.help.name} ${p.help.usage}`)
          msgB.push(`  **Infomation:** ${p.help.information}`)
          msgB.push(`  **Permissions:** ${p.settings.permission}+`)
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
          msgB.push(`  **Permission To Use:** ${Perms}`)
          let embed = new discord.RichEmbed()
            .setAuthor(`Help menu for ${p.help.name}`, bot.user.avatarURL)
            .setDescription(msgB)
            .setColor("7289DA")
            .setFooter(`${bot.user.username} | Discord Bot by RHG#0822`)
          message.channel.send({embed: embed}).then(m => m.delete(55000))

        }
      });
    });
  };
}

module.exports.help = {
  name: "help",
  usage: `(commandname)`,
  information: "Sends this message or sends more information on a command.",
  category: ""
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
}
