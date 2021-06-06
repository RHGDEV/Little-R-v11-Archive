module.exports.run = (bot, message, args) => {
  var amm = args[0];
  if(args[0] == "all") {
    amm = 100;
  } else if (isNaN(args[0])) {
    return message.channel.send('Please define a number..');
  } else {
    amm = args[0];
  }
  // if (amm < 3) {
  //   return message.channel.send('The minimum is ammount you can delete is 3.').then(m => m.delete(2500))
  // }
  // if (amm > 190) {
  //   message.channel.send("The maximum is ammount you can delete is 90.").then(m => m.delete(2500))
  //   return;
  // }
  message.channel.send(":exclamation: Beginning to purge " + args[0] + " messages... :exclamation:").then(m => m.delete(3000));

  setTimeout(function() {
    //message.channel.fetchMessages({limit: amm}).then(m => message.channel.bulkDelete(m))
    message.channel.fetchMessages({limit: amm++}).then(m => {
      m.forEach((msg) => {
        msg.delete().catch();
      });
      message.channel.send("Purging " + args[0] + " messages.").then(m => m.delete(2500));
    });
  }, 3500);
};

module.exports.help = {
  name: "purge",
  usage: `[ammount]`,
  information: "Remove x ammount of messages"
};

module.exports.settings = {
  permission: "Admins",
  deleteresponder: true,
  category: "Moderation"
};
