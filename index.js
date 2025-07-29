const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./token");
const { connectToMongoDB } = require("./connection");
const fetch = require("node-fetch");

//intent means type of permission
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];

    const res = await fetch("http://localhost:8001/api/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url.trim(),
      }),
    });
    const data = await res.json();
    return message.reply({
      content: "Genrated short ID = " + "http://localhost:8001/"+ data.id,
    });
  }
  message.reply({
    content: "Hi from bot!",
  });
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("Pong!!");
});

client.login(token);
