const Discord = require("discord.js");
const config = require("./config.json");

const shard = new Discord.ShardingManager("./index.js", {
	totalShards: "auto",
	token: process.env.token,
	respawn: true
});

shard.on("launch", (s) => {
  console.log("Launching shard " + (s.id + 1) + "/" + shard.totalShards);
});

shard.spawn();
