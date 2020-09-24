const guildModel = require("../models/guildModel");
const Discord = require("discord.js");
module.exports = async guild => {
    await guildModel.deleteMany({
        guildID: guild.id
    });
    
    console.log(`LEFT GUILD: ${guild.name} | ${guild.id}`);
}
