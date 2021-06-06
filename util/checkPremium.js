const config = require("../config.json"),
premiumServers = config.premium.premiumServers,
enabled = config.premium.premium,
creatorid = config.default.creatorid;
// "304402108059484161", "331998474545528833"

let pre = `\n💰 **This server's Premium Status:** \n__**PREMIUM**__\n\nThanks for donating!`,
def = `\n💰 **This server's Premium Status:** \n__**DEFAULT**__\n\nTo add a Premium status to your server go here! =>> [Buy Premium](https://littler.tk/premium)`,

featureDef = `\n💰 **This feature is Premium only:**\n\nTo add a Premium status to your server go here! =>> [Buy Premium](https://littler.tk/premium)`,
disabledDef = `\n💰 **Premium Disabled:**\nAt this time looks like my creator has made premium free for everyone enjoy!\n~Rusty, creator of Little R`;


function returnStatus(sendMessage, feature, premium) {
  if (sendMessage == true) {
    if (feature == true) {
      if (premium !== true) {
        return featureDef;
      }
    } else {
      if (premium == true) {
        return pre;
      } else {
        return def;
      }
    }
  } else {
    if (premium == true) {
      return true;
    } else {
      return false;
    }
  }
}


module.exports = (bot, message, sendMessage, feature) => {
  if (sendMessage !== true) {
    if (message.author.id == creatorid) {
      return true;
    } else if (enabled == false) {
      return true;
    }
  }

  if (enabled == false) {
    return disabledDef;
  }

  var premium = false;

  var owner = message.guild.owner;
  var ownID = message.guild.ownerID;
  var LGuild = bot.guilds.get("387211675239186445");
  if (!LGuild) return message.channel.send(`D'Oh I should really be in my own discord right now...`).then(m => m.delete(5000));
  var guildMember = LGuild.members.find("id", message.guild.ownerID);
  console.log(guildMember);
  if (guildMember) {
    if (guildMember.roles.some(r => ["Premium"].includes(r.name))) {
      premium = true;
    }
  }


  premiumServers.forEach((serverid, i) => {
    if (message.guild.id == serverid) {
      premium = true;
    }
  });

  if (sendMessage == true) {
    if (feature == true) {
      if (premium !== true) {
        return featureDef;
      }
    } else {
      if (premium == true) {
        return pre;
      } else {
        return def;
      }
    }
  } else {
    if (premium == true) {
      return true;
    } else {
      return false;
    }
  }
};