const config = require("../config.json");
const discord = require('discord.js');
const fs = require("fs");
var prefix = config.default.prefix
const commandCategories = ["Moderation", "Info", "Fun"]
const commandEmojis = ["🛠", "❔", "🙃😛", "🎶 👂"]
const checkPerm = require("../util/permissions.js");

module.exports.run = (bot, message, args) => {

  //message.channel.send("The help command is currently in the works AGAIN, but I'm a bot by RHG. I'm still in the works as of now, sorry!")
  //return;

  if (!args[0]) {
    let embed = new discord.RichEmbed()
      .setAuthor(`Help Command`, bot.user.avatarURL)
      .setColor("7289DA")
      .setFooter(`${bot.user.username} Help Command | http://littler.tk`)
      .setURL("https://littler.tk")
      .setDescription(`**Use *l;help (Command Category)* to get total commands in the categories!**\n**Use l;help cmd (command name) to get info on a command!**`)
      .addField(`Categories:`, `${commandCategories.join(`\n`)}`)
      .addField(`Links:`, `[Website](https://littler.tk/) | [Invite](https://littler.tk/invite.html) | [GitHub](https://github.com/RHGDEV/Little-r) \n [Discord](https://discord.gg/WUTAaSW) | [Twitter](http://www.twitter.com/RHGRDev) | [Patreon](http://www.patreon.com/_RHG)`, true)
      .addField(`More:`, `Palceholder`)

    message.channel.send({ embed: embed }).then(m => m.delete(55000))
  } else {
    if (!args[1]) {
      let cmd = args[0];
      fs.readdir(`./commands/`, (err, files) => {
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        var msgA = [];
        var count = 0
        commandCategories.forEach((cate, i) => {
          if (args[0].toLowerCase() == cate.toLowerCase()) {
            msgA.push(`   -`)
            jsfiles.forEach((f, i) => {
              let p = require(`../commands/${f}`)
              if (p.settings.category == cate) {
                if (p.settings.permission.toLowerCase() !== "creator") {
                  msgA.push(`   [${prefix}${p.help.name}](https://littler.tk/commands)  -  ${p.help.information}`);
                  count++
                }
              }
            });
            let embed = new discord.RichEmbed()
              .setAuthor(`${cate} ${commandEmojis[i]}`, bot.user.avatarURL)
              .setDescription(msgA)
              .setColor("7289DA")
              .setFooter(`${cate} | ${count} | ${bot.user.username} Command List | http://littler.tk`)
              .setURL("https://littler.tk")

            message.channel.send({ embed: embed }).then(m => m.delete(55000))
            msgA = [];
            count = 0
            return
          }
        });
        if (message.author.id !== config.default.creatorid) return;
        if (args[0].toLowerCase() == "creator") {
          msgA.push(`   -`)
          jsfiles.forEach((f, i) => {
            let p = require(`../commands/${f}`)
            if (p.settings.permission.toLowerCase() == "creator") {
              msgA.push(`   [${prefix}${p.help.name}](https://littler.tk/commands)  -  ${p.help.information}`);
              count++
            }

          });
          let embed = new discord.RichEmbed()
            .setAuthor(`Creator 📝😑`, bot.user.avatarURL)
            .setDescription(msgA)
            .setColor("7289DA")
            .setFooter(`Creator | ${bot.user.username} Command List | http://littler.tk`)
            .setURL("https://littler.tk")

          message.channel.send({ embed: embed }).then(m => m.delete(55000))
          msgA = [];
          count = 0
          return
        };
      });
    } else {
      let cmd = args[1];
      fs.readdir("./commands/", (err, files) => {
        var msgB = [];
        if (err) return console.log(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        jsfiles.forEach((f, i) => {
          let p = require(`../commands/${f}`);
          if (p.help.name == cmd.toLowerCase()) {
            if (p.settings.permission.toLowerCase() == "creator") {
              if (message.author.id !== config.default.creatorid) return
            }
            msgB.push(`   -`)
            msgB.push(`  **Usage:** ${prefix}${p.help.name} ${p.help.usage}`)
            msgB.push(`  **Infomation:** ${p.help.information}`)
            msgB.push(`  **Permissions:** ${p.settings.permission}+`)

            var Perms = "No"
            if (checkPerm(bot, message, p.settings.permission.toLowerCase(), false) == true) {
              Perms = "Yes"
            }

            msgB.push(`  **Permission To Use:** ${Perms}`)
            let embed = new discord.RichEmbed()
              .setAuthor(`Help menu for ${p.help.name}`, bot.user.avatarURL)
              .setDescription(msgB)
              .setColor("7289DA")
              .setFooter(`${bot.user.username} | https://littler.tk`)
            message.channel.send({ embed: embed }).then(m => m.delete(55000))

          }
        });
      });
    };
  }
};

module.exports.help = {
  name: "help",
  usage: `(category : cmd) (command name)`,
  information: "Sends this message or sends more information on a command.",
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
}