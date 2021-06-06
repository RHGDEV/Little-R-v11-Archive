const config = require("../config.json"),
pak = require("../package.json");

// • ⦠ ⧐ ⧽

module.exports = (bot) => {
	//bot.user.setGame(`${config.default.prefix}help`);
	bot.user.setActivity(`${config.default.prefix}help`, { type: "STREAMING", url: "https://www.twitch.tv/rhg_discord" });

	var status = [
		`${config.social.Website}`,
		`V${pak.version}`,

		`${bot.guilds.array().length} server${bot.guilds.array().length > 1 ? 's' : ''}`,
		`${bot.channels.array().length} channel${bot.channels.array().length > 1 ? 's' : ''}`,
		`${bot.users.array().length} user${bot.users.array().length > 1 ? 's' : ''}`,

		`${config.default.prefix}help for commands`,
		`${config.default.prefix}stats for bot infomation`,
		`${config.default.prefix}about for bot creator and etc.`,

		`Thanks for everthing.`,
		`I will be updated soon... Hang tight!`,
	];

	var types = [
		`WATCHING`,
		`LISTENING`,

		`LISTENING`,
		`LISTENING`,
		`WATCHING`,

		`STREAMING`,
		`STREAMING`,
		`STREAMING`,

		`PLAYING`,
		`PLAYING`,
		`PLAYING`
	];

	gameval = 0;
	setInterval(() => {
		if (bot.user.presence.game.name.startsWith(`${config.default.prefix}help`)) {
			if (gameval == status.length) {
				gameval = 0;
			}
			// bot.user.setGame(`${config.default.prefix}help ⦠ ${status[gameval]}`);
			bot.user.setActivity(`${config.default.prefix}help ⦠ ${status[gameval]}`, { type: types[gameval], url: "https://www.twitch.tv/rhg_discord" });
			//console.log(`Change staus: ${game} ${gameval}/${status.length}`)
			gameval++;
		}
	}, 30000);

	// setInterval(() => {

	// }, 60000);

};