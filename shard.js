const Discord = require("discord.js");
const config = require("./config.json");

const shard = new Discord.ShardingManager("./LittleR.js", {
  totalShards: "auto",
  token: process.env.token ? process.env.token : require("./config.json").keys.token,
  respawn: true
});

shard.on("launch", (s) => {
  console.log("Launching shard " + (s.id + 1) + "/" + shard.totalShards);
});

shard.spawn();