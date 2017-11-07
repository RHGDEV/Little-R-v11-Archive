const Discord = require("discord.js");
const config = require("../config.json");


module.exports.run = (bot, message, args) => {
			var reason = args.slice(1);
			reason = reason.join(' ')

			if (isNaN(args[0])){
				return message.channel.send('Please define a number..')
			}

			var amm = args[0]
			if (amm < 3){
				return message.channel.send('The minimum is ammount you can delete is 3.')
      }
      if (amm > 190){
       	message.channel.send("The maximum is ammount you can delete is 90.");
        return;
      }
			message.channel.send(":exclamation: Beginning to purge " + amm + " messages... :exclamation:")

			setTimeout(continueEx1, 3000);
			function continueEx1() {
				message.channel.bulkDelete(amm, true)
				message.channel.send("Done! Purged " + amm + " messages.").then(m => m.delete(2500))
			};


}

module.exports.help = {
	name: "purge",
	usage: `[ammount]`,
	information: "Remove x ammount of messages"
}

module.exports.settings = {
	permission: "Admins",
	deleteresponder: true,
	category: "Moderation"
}
