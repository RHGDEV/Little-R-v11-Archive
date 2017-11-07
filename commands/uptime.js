const config = require("../config.json");
const humanizeduration = require("humanize-duration");

module.exports.run = (bot, message, args) => {
			//message.channel.send(bot.uptime)
		message.channel.send(humanizeduration(Date.now() - bot.uptime))
}

module.exports.help = {
	name: "uptime",
	usage: ``,
	information: "Get the total time Little R has been up."
}

module.exports.settings = {
	permission: "Creator",
	deleteresponder: true,
	category: "Info"
}
