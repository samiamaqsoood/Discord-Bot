const {Client, GatewayIntentBits} = require("discord.js");
const {token} = require("./token")
//intent means type o permission
const client = new Client({ intents: [
     GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildMessages,
     GatewayIntentBits.MessageContent
    ] });

client.on("messageCreate", (message)=>{
    console.log(message.content)
})

client.login(token);
