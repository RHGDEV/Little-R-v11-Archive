const config = require("../config.json"),
discord = require('discord.js'),
fs = require("fs"),
prefix = config.default.prefix,
commandCategories = ["Moderation", "Info", "Fun", "Social", "18+"],
commandEmojis = ["🛠", "❔", "🙃😛", "🐦 ⚽", "😳 😱"],
commandDesc = [
                  "Let me do the honors for you! Or you could do it yourself either way it gets done!", 
                  "Let me send some infomation about me or another person, or search google on your own time!", 
                  "Let's have some fun this this channel! Try one of thease commands to get the party started!",
                  "Let me pickup some information from an RSS feed or something else.", 
                  "Some of thease are not for kids! Some of the commands are restricted to NSFW only channels!"],
checkPerm = require("../util/permissions.js");

module.exports.run = (bot, message, args) => {

  //message.channel.send("The help command is currently in the works AGAIN, but I'm a bot by RHG. I'm still in the works as of now, sorry!")
  //return;

  if (!message.channel.permissionsFor(bot.user).has("EMBED_LINKS") || !message.guild.members.get(bot.user.id).hasPermission(["EMBED_LINKS"])) {
    console.log("WELP 2");
    message.channel.send(`I think this command would work better *IF* I had permission to embed links!`).then(m =>m.delete(10000));
    return;
  }

  if (!args[0]) {
    let embed = new discord.RichEmbed()
      .setAuthor(`HELP`)
      .setColor("7289DA")
      .setFooter(`HELP | ${config.social.Website}`, bot.user.avatarURL)
     // .setThumbnail(bot.user.avatarURL)
      .setURL(config.social.Website)
      .setDescription(`**Use *l;help (Command Category)* to get the commands in the categories!**\n**Use *l;help cmd (Command Name)* to get info on a command!**`)
      .addField(`Categories:`, `${commandCategories.join(`\n`)}\nMusic`, true)
      .addField(`Links:`, `[Website](${config.social.Website}) | [Invite](${config.social.Website}invite) | [GitHub](${config.social.GitHub})\n[Discord](https://discord.gg/${config.default.discordCode}) | [Twitter](${config.social.Twitter}) | [Patreon](${config.social.Patreon})`, true)
      .addField(`More:`, `Yeah, just recently changed this so it probally doesn't look nice as of now.`, false);

    message.channel.send({ embed: embed }).then(m => m.delete(55000)).catch(()=>{
      message.channel.send(`I think this command would work better *IF* I had permission to embed links!`).then(m =>m.delete(10000));
    });
  } else {
    if (!args[1]) {
      let cmd = args[0];
      fs.readdir(`./commands/`, (err, files) => {
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        var msgA = [],
        count = 0;
        commandCategories.forEach((cate, i) => {
          if (args[0].toLowerCase() == cate.toLowerCase()) {
            msgA.push(`- *${commandDesc[i]}*\n`);
            jsfiles.forEach((f, i) => {
              let p = require(`../commands/${f}`);
              if (p.settings.category == cate) {
                if (p.settings.permission.toLowerCase() !== "creator") {
                  msgA.push(`   [${prefix}${p.help.name}](${config.social.Website}commands)  -  ${p.help.information}`);
                  count++;
                }
              }
            });
            let embed = new discord.RichEmbed()
              .setAuthor(`${cate} ${commandEmojis[i]}`)
              .setDescription(msgA)
              .setColor("7289DA")
              .setFooter(`${cate} | ${count} | ${bot.user.username} Command List | ${config.social.Website}`, bot.user.avatarURL)
              .setURL(config.social.Website);

            message.channel.send({ embed: embed }).then(m => m.delete(55000));
            msgA = [];
            count = 0;
            return;
          }
        });
        if (args[0].toLowerCase() == "music") {
          let embed = new discord.RichEmbed()
            .setAuthor(`Music 🎶 🎧`)
            .setColor("7289DA")
            .setFooter(`Music | 6 | ${bot.user.username} Command List | ${config.social.Website}`, bot.user.avatarURL)
            .setURL(config.social.Website)
            .setDescription(`
  - *Listen to some fine tunes either by your friends or yourself!*\n
    [${prefix}music play](https://littler.tk/commands)  -  Play some tunes
    [${prefix}music skip](https://littler.tk/commands)  -  Skip that aweful song you hate the most!.
    [${prefix}music fskip](https://littler.tk/commands)  -  Really skip that aweful song you hate the most!.
    [${prefix}music stop](https://littler.tk/commands)  -  Just forget clear the entire queue!
    [${prefix}music queue](https://littler.tk/commands)  -  let's see what's in the queue!
    [${prefix}music np](https://littler.tk/commands)  -  See what is playing!

    *${prefix}help cmd (command name) doesn't work on thease commands!*
            `);

          message.channel.send({ embed: embed }).then(m => m.delete(55000));
          msgA = [];
          count = 0;
          return;
        }

        if (message.author.id !== config.default.creatorid) return;
        if (args[0].toLowerCase() == "creator") {
          msgA.push(`- *Hey looks like your my creator. Well how else would you have access to this?*`);
          jsfiles.forEach((f, i) => {
            let p = require(`../commands/${f}`);
            if (p.settings.permission.toLowerCase() == "creator") {
              msgA.push(`   [${prefix}${p.help.name}](${config.social.Website}commands)  -  ${p.help.information}`);
              count++;
            }

          });
          let embed = new discord.RichEmbed()
            .setAuthor(`Creator 📝😑`)
            .setDescription(msgA)
            .setColor("7289DA")
            .setFooter(`Creator | ${bot.user.username} Command List | ${config.social.Website}`, bot.user.avatarURL)
            .setURL(config.social.Website);

          message.channel.send({ embed: embed }).then(m => m.delete(55000));
          msgA = [];
          count = 0;
          return;
        }
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
              if (message.author.id !== config.default.creatorid) return;
            }
            msgB.push(`   -`);
            msgB.push(`  **Usage:** ${prefix}${p.help.name} ${p.help.usage}`);
            msgB.push(`  **Infomation:** ${p.help.information}\n`);
            msgB.push(`  **Permissions:** ${p.settings.permission}+`);

            var Perms = "No";
            if (checkPerm(bot, message, p.settings.permission.toLowerCase(), false) == true) {
              Perms = "Yes";
            }

            msgB.push(`  **Permission To Use:** ${Perms}`);
            let embed = new discord.RichEmbed()
              .setAuthor(`${p.help.name.toUpperCase()} HELP - ${p.settings.category.toUpperCase()}`)
              .setURL(config.social.Website)
              .setDescription(msgB)
              .setColor("7289DA")
              .setFooter(`${bot.user.username} | ${config.social.Website}`, bot.user.avatarURL);
            message.channel.send({ embed: embed }).then(m => m.delete(55000));

          }
        });
      });
    }
  }
};

module.exports.help = {
  name: "help",
  usage: `(category : cmd) (command name)`,
  information: "Sends this message or sends more information on a command.",
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
};