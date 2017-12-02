const ms = require("ms");
const Discord = require('discord.js');
const {makeCase} = require('../util/makeCase.js');

module.exports.run = (bot, message, args) => {
		var member = message.mentions.members.first();
		if(!member) {
			var msgA = [];
			msgA.push(`= **Muted Members** =\n`)

			message.guild.members.forEach(async (m) => {
				if(m.roles.find("name", "Muted")) {
					msgA.push(`${m.user.username} <${m.user.id}>`)
				}
			});
			console.log(msgA)
			if(msgA == `= **Muted Members** =\n`){
					msgA.push(`== **Nobody is muted at the moment**==`)
			}
			message.channel.send(msgA).then(m => m.delete(25000));
			return;
		}
		let rarg = message.content.split(" ").slice(2)
		let reason = rarg.join(" ")
		let id = member.user.id
		let musername = member.user.username
		if(!reason){reason = "No reason given."}
		let muteRole = message.guild.roles.find("name", "Muted");

		if(!member.roles.find("name", "Muted")) return message.channel.send(`:x: ${member.user.username}, isn't muted!`).then(m => m.delete(2500))
		makeCase(bot, message, "😮 Unmute", `${rarg.join(" ")}`, message.author.tag, member.user.tag)
			let mutede = new Discord.RichEmbed()
	        .setColor(`#00FF00`)
	        .setAuthor(`Hi, ${member.user.username}!`)
					.setDescription(`:speaker: You are now unmuted in ${message.guild.name}.`)
	        .addField(`Reason:`, `${reason}`)
	        .setFooter(`MANUAL UNMUTE`)
	        .setTimestamp()
		  member.user.send({embed: mutede}).then(m => m.delete(15000))
			member.removeRole(muteRole.id);
			message.channel.send(`${member.user.username}, is now unmuted`).then(m => m.delete(2500))
}

module.exports.help = {
	name: "unmute",
	usage: `[user] (reason)`,
	information: "Unmute the mentioned user."
}

module.exports.settings = {
	permission: "Admins",
	deleteresponder: true,
	category: "Moderation"
}
