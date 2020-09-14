const BaseCommand = require('../../utils/structures/BaseCommand');
const globalData = require('../../database/user');
const { MessageEmbed } = require('discord.js');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('profile', 'general', []);
  }

  async run(client, message, args) {
    let user =
      message.mentions.members.last() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(a => a.username == args) ||
      message.guild.members.cache.get(a => a.displayName == args[0]) ||
      message.member;

    let embed = new MessageEmbed()
      .setAuthor(user.username + "Profile Card", message.author.displayAvatarURL({ dynamic: true }))
      .addField("> Global Information", `**Name** ${user.username}\n**ID:** \`\`${message.author.id}\`\``)
      .setColor("#FFFFFF");

    globalData.findOne(
      {
        userID: user.id
      },
      (err, db) => {

        if (err) console.log(err);

        if (!db) {
          embed.addField("> Games Data", `**Points:** \`None\`\n**Wins:** \`None\`\n**Loses:** \`None\`\n**Played Matches:** \`None\`\n**Wins/Loses:** None`)

          embed.addField("> Economy Data", `**Coins:** \`\`None\`\`\n**Bank:** \`\`None\`\`\n**Bank Name:** None\n**Card type:** None\n**Card status:** None\n**Card name:** None\n**Card ID:** None\n**Card expiration date:** None\n**Totan tax:** None`)
          embed.addField("> Level Data", `**Level:** None\n**Xp:** None`)
          return message.channel.send("embed");
        } else {
          embed.addField("> Games Data", `**Points:** \`${db.games.guildPoints}\`\n**Wins:** \`${db.games.guildWins}\`\n**Loses:** \`${db.games.guildLoses}\`\n**Played Matches:** \`${db.games.guildMatchs}\`\n**Wins/Loses:** \`${Math.round(db.games.guildWins/(db.games.guildWins + db.games.guildLoses) * 7)}\``)

          embed.addField("> Economy Data", `**Coins:** \`\`$${db.eco.coins}\`\`\n**Bank:** \`\`$${db.bank.bankCoins || "None"}\`\`\n**Card type:** ${db.bank.cardType || "None"}\n**Card name:** ${db.bank.cardName || "None"}\n**Card ID:** ${db.bank.cardID || "None"}\n**Card expiration date:** ${db.bank.cardexpirDate || "None"}\n**Totan tax:** ${db.eco.totalTax}\n**CBT: ${Math.round(db.bank.bankCoins + db.eco.totalTax + db.eco.coins)}**`)
          embed.addField("> Level Data", `**Level:** ${db.leveling.guildLevel}\n**Xp:** ${db.leveling.guildXp}`)
          return message.channel.send(embed)
        }
      }
    )

  }
};