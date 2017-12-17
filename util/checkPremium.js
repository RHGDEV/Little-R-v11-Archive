const config = require("../config.json")
const premiumServers = config.premium.premiumServers
const enabled = config.premium.premium
const creatorid = config.default.creatorid

let pre = `\n💰 **This server's Premium Status:** \n__**PREMIUM**__\n\nThanks for donating!`
let def = `\n💰 **This server's Premium Status:** \n__**DEFAULT**__\n\nTo add a Premium status to your server go here! =>> [Buy Premium](https://littler.tk/premium)`

let featureDef = `\n💰 **This feature is Premium only:**\n\nTo add a Premium status to your server go here! =>> [Buy Premium](https://littler.tk/premium)`
let disabledDef = `\n💰 **Premium Disabled:**\nAt this time looks like my creator has made premium free for everyone enjoy!\n~Rusty, creator of Little R`

module.exports = (bot, message, sendMessage, feature) => {
  if (sendMessage !== true) {
    if (message.author.id == creatorid) {
      return true
    } else if (enabled == false) {
      return true
    }
  }
  if (enabled == false) {
    return disabledDef
  }
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