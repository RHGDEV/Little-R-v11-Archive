const config = require("../config.json");
const {makeCase} = require('../util/makeCase.js');

module.exports.run = (bot, message, args) => {
 message.guild.ban(args[0], "This was an ID ban").then(() => {
		 message.channel.send(`:hammer: Banning the ID ${args[0]}`).then(m => m.delete(2500))
		 setTimeout(function() {
	     message.channel.send(`:hammer: I have banned the ID ${args[0]}`).then(m => m.delete(2500))
       makeCase(bot, message, "🔨 ID Ban", `${reason.join(" ")}`, message.author.tag, args[0])
	   }, 2500)
 }).catch(err => {
		 message.channel.send(`:x: The ID ${(args) ? args[0] : "0"} is not a valid user.`).then(m => m.delete(2500))
 });
}

module.exports.help = {
	name: "idban",
	usage: `[userid]`,
	information: "Ban a user by their ID, even if they haven't joined your server."
}

module.exports.settings = {
	permission: "Admins",
	deleteresponder: true,
	category: "Moderation"
}
