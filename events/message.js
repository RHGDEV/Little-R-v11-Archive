const config = require("../config.json"),
prefix = config.default.prefix,
creatorid = config.default.creatorid,
{ makeCase } = require("../util/makeCase.js"),
checkPerm = require("../util/permissions.js"),
notCommand = require("../util/nonCommand.js"),
dmCommands = require("../util/dmCommands.js");
let commandcool = new Set();

function removedat(msg, cmd) {
  if (cmd.settings.deleteresponder) {
    if (!msg.deletable) return;
    setTimeout(function() {
      msg.delete();
    }, 3000);
  }
}

module.exports = (bot, db, message) => {
  if (message.author.bot) return;
  //if (message.author.id == bot.user.id) return;
  let mArray = message.content.split(" ");
  let args = mArray.slice(1);
  let cmd = bot.commands.get(mArray[0].slice(prefix.length).toLowerCase());

  if (message.channel.type === "dm") {
    console.log("dm console");
    dmCommands(bot, message);
    return;
  }

  if (!cmd) {
    if (message.content.startsWith(`${prefix}music`)) return;
    notCommand(bot, message);
    return;
  }

  if (message.content.toLowerCase().indexOf(prefix.toLowerCase()) !== 0) return;

  if (cmd) {
    if (commandcool.has(message.author.id) && message.author.id != config.default.creatorid){
      message.reply(` You need to wait atleast 3 seconds to run another command.`).then(m => m.delete(2500));
      removedat(message, cmd);
      return;
    } else if (message.author.id != config.default.creatorid) {
      commandcool.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after 3 seconds
        commandcool.delete(message.author.id);
      }, 3000);
    }

    // message.channel.startTyping();
    // setTimeout(function () {
    //   message.channel.stopTyping();
    // }, 6000);
    // const cmdperm = await checkPerms(bot, message, cmd.settings.permission.toLowerCase())
    if (checkPerm(bot, message, cmd.settings.permission.toLowerCase(), true) == false) {
      removedat(message, cmd);
      return;
    }

    cmd.run(bot, message, args);
    removedat(message, cmd);
  }
};