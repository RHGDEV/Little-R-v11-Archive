const config = require("../config.json");

module.exports.run = (bot, message, args) => {//return;
	  let reason = args.slice(1);
		if(message.mentions.users.size === 0){
			return message.channel.send(`:question: Don't you need to mention someone?`)
		}
		let kick = message.guild.member(message.mentions.users.first());
		if(!kick){
			return message.channel.send(`:x: That's not a vaild user.`)
		}
		if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS", true)){
			return message.channel.send(`:x: I can't kick unless I have the permissions to kick.`)
		}

		kick.kick(`${reason.join(' ')} | Kicked by ${message.author.username}`).then(member => {
			message.channel.send(`:white_check_mark: Successfully kicked ${member.user.username}`).then(m => m.delete(2500))
		}).catch(e => {
			message.channel.send(`:x: Looks like this user is a higher role!`).then(m => m.delete(2500))
		});
}


module.exports.help = {
	name: "kick",
	usage: `[user] (reason)`,
	information: "Kick a user from the guild."
}

module.exports.settings = {
	permission: "Admins",
	deleteresponder: true,
	category: "Moderation"
}
