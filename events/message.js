const config = require("../config.json");
const prefix = config.default.prefix
const creatorid = config.default.creatorid
const { makeCase } = require("../util/makeCase.js");
const checkPerm = require("../util/permissions.js");
const notCommand = require("../util/nonCommand.js");
const dmCommands = require("../util/dmCommands.js");
let commandcool = new Set();

function removedat(msg, cmd) {
  if (cmd.settings.deleteresponder) {
    if (!msg.deletable) return
    setTimeout(function() {
      msg.delete()
    }, 3000)
  };
}

module.exports = (bot, db, message) => {
  if (message.author.bot) return;
  if (message.author.id == bot.user.id) return;
  let mArray = message.content.split(" ");
  let args = mArray.slice(1);
  let cmd = bot.commands.get(mArray[0].slice(prefix.length).toLowerCase())

  if (message.channel.type === "dm") {
    console.log("dm console");
    dmCommands(bot, message);
    return;
  }

  if (!cmd) {
    if (message.content.startsWith(`${prefix}music`)) return;
    notCommand(bot, message)
    return;
  };

  if (message.content.toLowerCase().indexOf(prefix.toLowerCase()) !== 0) return;

  if (cmd) {
    if (commandcool.has(message.author.id)) {
      message.reply(` You need to wait atleast 3 seconds to run another command.`).then(m => m.delete(2500))
      removedat(message, cmd)
      return
    } else {
      commandcool.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after 3 seconds
        commandcool.delete(message.author.id);
      }, 3000);
    }

    message.channel.startTyping();
    // const cmdperm = await checkPerms(bot, message, cmd.settings.permission.toLowerCase())
    if (checkPerm(bot, message, cmd.settings.permission.toLowerCase(), true) == false) {
      message.channel.stopTyping();
      removedat(message, cmd);
      return;
    }

    cmd.run(bot, message, args);

    removedat(message, cmd);
    setTimeout(function() {
      message.channel.stopTyping()
    }, 5000);
  };
}