const guildModel = require("../models/guildModel");
module.exports = async guild => {
    await guildModel.create({
        guildID: guild.id
    });
    guild.language = "ar";
    guild.prefix = ".";
    console.log(`JOINED GUILD: ${guild.name} | ${guild.id}`);
}
