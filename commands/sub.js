const Discord = require("discord.js");
const config = require("../config.json");
const aRoles = config.avaibleroles

module.exports.run = (bot, message, args) => {
	if(!args[0]){

		var msgArray = [];
		msgArray.push(`= Subscribable Roles =\n[use ${config.prefix}sub <Role Name> to subscribe/Unsubscribe to it.]\n`);
		aRoles.forEach(async (role, i) => {
			msgArray.push(`#${i+1} - ${role}`);
		});
    message.channel.send(msgArray).then(m => m.delete(15000))

		return;
	}

	let wantedRole = args[0].toLowerCase()
	let gm = message.member
	aRoles.forEach(async (role, i) => {
		if(role.toLowerCase() == wantedRole){
			let wRole = message.guild.roles.find("name", role)
			if(!wRole){return message.channel.send("Some error has happen")}
			if(!gm.roles.find("id", wRole.id)){
				gm.addRole(wRole.id)
				setTimeout(continueEx1, 500);
				function continueEx1() {
					if(gm.roles.find("id", wRole.id)){
						message.channel.send(`${message.author}, you are now subscribed to ${wRole.name}!`).then(m => m.delete(5000))
					} else {
						message.channel.send(`${message.author}, unable to subscribe to ${wRole.name}!`).then(m => m.delete(5000))
					}
				}
				//message.channel.send(`${message.author}, you are now subscribed to ${wRole.name}!`)
				return;
			} else {
				gm.removeRole(wRole.id)
				setTimeout(continueEx2, 500);
				function continueEx2() {
					if(!gm.roles.find("id", wRole.id)){
						message.channel.send(`${message.author}, you are now unsubscribed to ${wRole.name}!`).then(m => m.delete(2500))
					} else {
						message.channel.send(`${message.author}, unable to unsubscribe to ${wRole.name}!`).then(m => m.delete(2500))
					}
				}
				return;
			}
		}
	});
//	message.channel.send(`${message.author}, I'm not allowed to give that role to you.`)
}

module.exports.help = {
	name: "sub",
	usage: `(role)`,
	information: "Subscribe / Unsubscribe from a role"
}

module.exports.settings = {
	permission: "All",
	deleteresponder: true,
	category: "Fun"
}
