const BaseCommand = require("../../utils/structures/BaseCommand");
const globalData = require("../../database/user")
const db = require("quick.db");
const Discord = require("discord.js");
const moment = require('moment')
module.exports = class TestCommand extends BaseCommand {
    constructor() {
      super("maths", "testing", []);
    }

    async run(client, message, args) {

      let active = await db.fetch(`Play_${message.author.id}`);

      let member = message.mentions.users.last() || client.users.cache.find(a => a.tag == args) || client.users.cache.filter(user => user.bot == false).find(a => a.id == args) || message.author

      if (active == "Playing..") return message.reply(`You can't play now please wait to end last math`)

      let question = [1];
      let answer = [1];

      let random = Math.floor(Math.random() * question.length);

      var t0 = new Date().getTime();

      db.set(`Play_${message.author.id}`, "Playing..")

      let embed = new Discord.MessageEmbed()

        .setTitle("Maths")
        .setAuthor(
          `${message.author.username}, You have 15 second to send the answer`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(`• Question :`, `__**\`${question[random]}\`**__`)
        .setColor("#D93564")
        .setFooter(`© ${client.user.username}, All Rights Reserved 2020`, client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(client.user.avatarURL());
      message.channel.send(embed)

        .then(msg1 => {
            let messageawait = message.channel.awaitMessages(
              msg => msg.content == answer[random], { max: 1, time: 15000, errors: ["time"] }
            );
            messageawait.catch(() => {
              return msg1.edit(
                `**Time up and this question answer: \`${answer[random]}\`**`
              );

              db.delete(`Play_${message.author.id}`)

            });

            messageawait.then(collected => {

                let fast = "Fast";
                let Sofast = "So fast";
                let Mid = "Medium";
                let Slow = "Slow";
                let SoSlow = "So Slow";

                var t1 = new Date().getTime();

                var stat = moment(t1 - t0).format("s");
                var inf;
                if (stat == 0) inf = "Fantastic speed";
                if (stat == 1) inf = Sofast;
                if (stat == 2) inf = Sofast;
                if (stat == 3) inf = Sofast;
                if (stat == 4) inf = fast;
                if (stat == 6) inf = fast;
                if (stat == 7) inf = fast;
                if (stat == 8) inf = Mid;
                if (stat == 9) inf = Mid;
                if (stat == 10) inf = Mid;
                if (stat == 11) inf = Slow;
                if (stat == 12) inf = Slow;
                if (stat == 13) inf = Slow;
                if (stat == 14) inf = SoSlow;
                if (stat == 15) inf = SoSlow;

                globalData.findOne(
                  {
                    userID: user.id
                  },
                  (err, db) => {

                    if (err) console.log(err);
                    
                      let embed = new Discord.MessageEmbed()

                        .setFooter(
                          `© ${client.user.username}, All Rights Reserved 2020`,
                          client.user.displayAvatarURL({ dynamic: true })
                        )
                        .addField(`• Question :`, `**${question[random]}**`, true)
                        .addField(`• Answer :`, `**${answer[random]}**`, true)
                        .addField(`• Result was sent within :`, `${moment(t1 - t0).format("s.SSS")} second`)
                        .addField(`• Speed Level :`, `${inf || "None"}`)
                        .setColor("GREEN")
                        .setAuthor(
                          `• The Winner ${collected.first().author.tag}`,
                          collected.first().author.displayAvatarURL({ dynamic: true })
                        )
                        .setThumbnail(
                          collected.first().author.displayAvatarURL({ dynamic: true }));

                      msg1.edit(embed)
                      
     db.games.guildPoints = db.games.guildPoints + Math.ceil(Math.random() * 6) + 1;
     db.games.guildWins = db.games.guildWins + 1;
     db.games.guildMatchs = db.games.guildMatchs + 1;
     db.markModified("games")
     db.save()
                  ))
                })
            });
        }
    };