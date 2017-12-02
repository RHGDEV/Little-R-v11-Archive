const {makeCase} = require('../util/makeCase.js');

module.exports.run = (bot, message, args) => {//return;
		let reason = args.slice(1).join(" ")
		if(!reason){reason = "No reason given."}

		if(message.mentions.users.size === 0){
			return message.channel.send(`:question: Don't you need to mention someone?`).then(m => m.delete(2500))
		}
		let kick = message.guild.member(message.mentions.users.first());
		if(!kick){
			return message.channel.send(`:x: That's not a vaild user.`).then(m => m.delete(2500))
		}
		if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS", true)){
			return message.channel.send(`:x: I can't ban unless I have the permissions to ban.`).then(m => m.delete(2500))
		}
		kick.ban(`${reason} | Banned by ${message.author.username}`).then(member => {
			message.channel.send(`:white_check_mark: Successfully banned ${member.user.username}`).then(m => m.delete(2500))
			makeCase(bot, message, "🔨 Ban", `${reason}`, message.author.tag, kick.user.tag)
			let banem = new Discord.RichEmbed()
					 .setColor("7289DA")
					 .setAuthor(`Hi, ${kick.user.username}!`)
					 .setDescription(`🔨 You have been banned from ${message.guild.name}!\n**Reason:** ${reason}`)
					 .setTimestamp()
		 kick.user.send({embed: banem});
		}).catch(e => {
			message.channel.send(`:x: Looks like this user is a higher role!`).then(m => m.delete(2500))
		});

}

module.exports.help = {
	name: "ban",
	usage: `[user] (reason)`,
	information: "Ban a user from the guild."
}

module.exports.settings = {
	permission: "Admins",
	deleteresponder: true,
	category: "Moderation"
}
