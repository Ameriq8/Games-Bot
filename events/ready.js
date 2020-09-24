const guildModel = require("../models/guildModel");
module.exports = async client => {
    client.user.setPresence({
        status: client.config.game.status,
        activity: {
            name: typeof client.config.game.name === "string" ? client.config.game.name : client.config.game.name instanceof Array ? client.config.game.name[0] : null,
            type: client.config.game.type,
            url: client.config.game.url && client.config.game.url.trim().length ? client.config.game.url : null
        }
    });
    if (client.config.game.name instanceof Array && client.config.game.name.length) {
        client.setInterval(async () => {
            let activity = client.config.game.name[Math.floor(Math.random() * client.config.game.name.length)];
            await client.user.setActivity(activity, {
                type: client.config.game.type,
                url: client.config.game.url && 
                    client.config.game.url.trim().length ? 
                    client.config.game.url : 
                    null
            });
        }, ((typeof client.config.game.interval === "number" && client.config.game.interval) || 30) * 1000);
    }
    for (let guild of client.guilds.cache.array()) {
        let language = "ar";
        let guildDocument = await guildModel.findOne({ guildID: guild.id });
        if (guildDocument && guildDocument.language) language = guildDocument.language;
        guild.language = language;
    }
    process.stdout.write("\n");
    console.log("-------------------------------");
    console.log(`BOT: ${client.user.username} is ready!`);
    console.log(`PREFIXES: ${client.config.prefixes.join(" ")}`);
    console.log(`GUILDS: ${client.guilds.cache.size}`);
    console.log(`CHANNELS: ${client.channels.cache.size}`);
    console.log(`USERS: ${client.users.cache.size}`);
    console.log(`BOOT TIME: ${process.uptime() * 1000}ms`);
}