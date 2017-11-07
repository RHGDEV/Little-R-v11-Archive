const config = require("../config.json");
const responses =
[
    "It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes definitely",
		"You may rely on it",
		"As I see it, yes",
		"Most likely",
		"Outlook good",
		"Yes",
		"Signs point to yes",
		"Reply hazy try again",
		"Ask again later",
    "Better not tell you now",
		"Cannot predict now",
    "Concentrate and ask again",
		"Don't count on it",
    "My reply is no",
    "My sources say no",
		"Outlook not so good",
		"Very doubtful"
]

module.exports.run = (bot, message, args) => {
  message.channel.send(`Asking 8ball "${args.join(" ")}"`).then(m => m.delete(2500))
  setTimeout(function() {
    message.channel.send(`${message.author.username}, 8Ball says:\n**${responses[Math.round(Math.random() * responses.length)]}**`)
  }, 2500)
}

module.exports.help = {
	name: "8ball",
	usage: `[question]`,
	information: "Ask the 8ball a question!"
}

module.exports.settings = {
	permission: "All",
	deleteresponder: true,
	category: "Fun"
}
