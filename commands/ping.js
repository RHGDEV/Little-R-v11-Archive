const config = require("../config.json");

module.exports.run = (bot, message, args) => {
  message.channel.send(`Pong...`).then((m) => {
    m.edit(`Pong!\nLatency is ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(bot.ping)}ms.`)
  })
}

module.exports.help = {
	name: "ping",
	usage: ``,
	information: "Check the ping of the bot."
}

module.exports.settings = {
	permission: "Creator",
	deleteresponder: true,
	category: "Info"
}
