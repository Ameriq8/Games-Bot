const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("invite", "general", ["Invite", "support", "Support"]);
  }

  async run(client, message) {
    let embed = new MessageEmbed()
    .setAuthor(`Request by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
    .setColor(`#FFFFFF`)
    .addField("> Links",`[Bot Invite](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\n[Support Server](https://discord.gg/7YREmU5)\n[Dashboard](https://www.google.com)`)
    .setFooter(`© ${client.user.username}, All Rights Reserved 2020`, client.user.avatarURL())
    message.channel.send(embed)
  }
};
