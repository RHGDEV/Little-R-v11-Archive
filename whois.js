const humanizeduration = require("humanize-duration");

module.exports.run = (bot, message, args) => {
	let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
let member = message.guild.member(user);
let roles = [];
if (member.roles.size > 0) {
	member.roles.forEach(r => {
		if (!r.name.includes("everyone")) {
			roles.push(r.name);
		}
	})
} else {
	roles = "no";
}
let ttt = (member.roles.size > 0) ? roles.length : "0";
let wato = (roles.length > 0) ? roles.join(", ") : "None";
let game = (!!user.presence && user.presence !== null && user.presence.game !== null && user.presence.game.name !== null) ? user.presence.game.name : "Nothing"
let embed = {
	author: {
		name: message.author.username + " is asking who is " + user.username,
		icon_url: (message.author.avatarURL !== null) ? message.author.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
	},
	color: 0x7289DA,
	thumbnail: {
		url: (user.avatarURL !== null) ? user.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
	},
	fields: [{
		name: "User",
		value: user.username + "#" + user.discriminator,
		inline: true
	}, {
		name: "ID",
		value: user.id,
		inline: true
	}, {
		name: "Nickname",
		value: (member.nickname !== null) ? member.nickname : "User has no nickname set",
		inline: true
	}, {
		name: "Game",
		value: "Playing " + game,
		inline: true
	}, {
		name: "Status",
		value: (user.presence !== null && user.presence.status !== null) ? user.presence.status : "Offline",
		inline: true
	}, {
		name: "Joined On",
		value: member.joinedAt.toString(),
		inline: true
	}, {
		name: "Account Created On",
		value: user.createdAt.toString(),
		inline: true
	}, {
		name: `Roles [${ttt}]`,
		value: wato,
		inline: true
	}]
}
message.channel.send("", {embed}).then(m => m.delete(15000))
}

module.exports.help = {
	name: "whois",
	usage: `(mention)`,
	information: "Get features of you or another person by mentioning them!"
}

module.exports.settings = {
	permission: "All",
	deleteresponder: true,
	category: "Info"
}
