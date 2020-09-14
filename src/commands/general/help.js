const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("help", "general", [""]);
  }

  async run(client, message, anything, args) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`Help Comamnd`)
      .addField(`General: `, "`help`, `avatar`, `user`, `bot`, `server`, `invite`, `roleinfo`, `report`")
      .addField(`Moderation: `, "`kick`, `ban`, `unban`, `mute`, `unmute`")
      .addField(`Tickets: `, "`new`, `setreactticket`")
      .addField(`Economy: `, "`coins`, `leaderboard`, `daily`, `pay`")
      .addField(`Giveaway: `, "`g-start`, `g-create`, `g-list`")
      .addField(`Fun: `, "`memes`, `fox`, `duck`, `dog`")
      .addField(`Games: `, "`rps`, `slots`")
      .addField(`Config: `, "`setwelcomer`, `setreport`, `setregion`, `welcome-status`, `report-status`")
      .setColor(`#FFFFFF`)
      .setFooter(`© ${client.user.username}, All Rights Reserved 2020`, client.user.avatarURL())
    message.author
      .send(embed)
      .then(m => message.react("733270880938885161"))
      .catch(err => {
        message.channel.send(embed);
        message.react("733270664932491304")
      });
  }
};
