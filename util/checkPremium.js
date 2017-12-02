const premiumServers = require("../config.json").premiumServers

let pre = `\n💰 **This server's Premium Status:** \nPREMIUM\n\nThanks for donating for this feature!`
let def = `\n💰 **This server's Premium Status:** \nDEFAULT\n\nTo add a Premium status to your server go here! =>> [Buy Premium](https://littler.tk/premium)`
let featureDef = `\n💰 **This feature is Premium only:**\n\nTo add a Premium status to your server go here! =>> [Buy Premium](https://littler.tk/premium)`

module.exports = (bot, message, sendMessage, feature) => {
  var premium = false
  premiumServers.forEach(async (serverid, i) => {
    if (message.guild.id == serverid) {
      premium = true
    }
  });

  if (sendMessage == true) {
    if (feature == true) {
      if (premium !== true) {
        return featureDef
      };
    } else {
      if (premium == true) {
        return pre
      } else {
        return def
      };
    }
  } else {
    if (premium == true) {
      return true
    } else {
      return false
    };
  };

};
