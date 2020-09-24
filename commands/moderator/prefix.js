const { MessageEmbed } = require("discord.js");
const guildModel = require("../../models/guildModel");

module.exports = {
  name: "setprefix",
  aliases: ["prefix"],
  permissions: ["MANAGE_GUILD"],
  usage: "language <code>",
  description: "language_command",
  ownerOnly: false,
  enabled: true,
  cooldown: 5,
  exec: async (client, message, args) => {
    let newPrefix = args[0];

        if (!newPrefix) return await message.channel.send(client.i18n.get(message.guild.language, "errors", "typePrefix"));

        let guildDocument = await guildModel.findOne({
            guildID: message.guild.id
        });
        
        if (!guildDocument) guildDocument = new guildModel({ guildID: message.guild.id });
        
        guildDocument.prefix = newPrefix;
        await guildDocument.save();
        message.guild.language = lang
        
        await message.channel.send(client.i18n.get(lang, "commands", "prefix_updated", { Prefix: newPrefix }));
  } 
}