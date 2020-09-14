const BaseCommand = require("../../utils/structures/BaseCommand");
const db = require("quick.db");
const Discord = require("discord.js");
const moment = require('moment')
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("فكك", "testing", ["Fkk", "fkk"]);
  }


  async run(client, message) {
    
    
    let active = await db.fetch(`Play_${message.author.id}`);

    if(active == "Playing..") return message.reply(`هناك جولة سارية بالفعل`)
    
    if (fetched !== null) {
      if (message.channel.id !== fetched)
        return message.channel.send(
          `Go to the <#${fetched}> and use the commands `
        );
    }
    
    let question = [1];
    let answer = [1];

    let random = Math.floor(Math.random() * question.length);
    
    var t0 =  new Date().getTime();
    
  db.set(`Play_${message.author.id}`, "Playing..")
    
    let embed = new Discord.MessageEmbed()

      .setTitle("فكك")
      .setAuthor(
        `${message.author.username}, لديك 15 ثانية لتفكيك الجملة`,
        client.user.avatarURL()
      )
      //.setDescription(`لديك 15 ثانية للإجابة:\n __**${question[random]}**__`)
      .addField(`الجملة هي :`, `__**\`${question[random]}\`**__`)
      .setColor("#D93564")
      .setFooter(`© ${client.user.username}`)
      .setThumbnail(client.user.avatarURL());
     message.channel.send(embed)

      .then(msg1 => {
        let messageawait = message.channel.awaitMessages(
          msg => msg.content == answer[random],
          { max: 1, time: 15000, errors: ["time"] }
        );
        messageawait.catch(() => {
          return msg1.edit(
            `لقد انتهى الوقت الجواب الصحيح هوا \`${answer[random]}\` `
          );
        // db.set(`Lose_Math_${message.author.id}`, Lose_Math+1)
      db.delete(`Play_${message.author.id}`)

        });

        messageawait.then(collected => {
          
          let fast = "سريع"
          let Sofast = "سريع جدا"
          let Mid = "متوسط"
          let Slow = "بطيء"
          let SoSlow = "بطيء جدا"

          var t1 =  new Date().getTime();
          
          let stat = moment( t1 - t0).format("s")
          let inf;
          if(stat == 0) inf = "سرعة خيالية <:Really:731069738360373279>"
          if(stat == 1) inf = Sofast
          if(stat == 2) inf = Sofast
          if(stat == 3) inf = Sofast
          if(stat == 4) inf = fast
          if(stat == 6) inf = fast
          if(stat == 7) inf = fast
          if(stat == 8) inf = Mid
          if(stat == 9) inf = Mid
          if(stat == 10) inf = Mid
          if(stat == 11) inf = Slow
          if(stat == 12) inf = Slow
          if(stat == 13) inf = Slow
          if(stat == 14) inf = SoSlow
          if(stat == 15) inf = SoSlow
          

          let embed = new Discord.MessageEmbed()

            .setTitle("فكك")
            .setFooter(`© ${client.user.username}, All Rights Reserved 2020`,client.user.displayAvatarURL({dynamic: true}))
            .addField(`• الجملة هي :`, `**${question[random]}**`, true)
            .addField(`• الجواب هو :`, `**${answer[random]}**`, true)
            .addField(`• تم حلها خلال :`, `<:Giveaway:731073771024285727>  ${moment(t1 - t0).format("s.SSS")} ثانية`)
            .addField(`• مستوى السرعة :`, `${inf || "None"}`)
            .setColor("GREEN")
            .setAuthor(
              `• The Winner ${collected.first().author.tag}`,
              collected.first().author.displayAvatarURL({ dynamic: true })
            )
            .setThumbnail(
              collected.first().author.displayAvatarURL({ dynamic: true })
            );
          
              db.set(`Points_${collected.first().author.id}`, GeneralPoints+1);
              db.set(`Played_${collected.first().author.id}`, played+1);
              db.set(`Win_Math_${collected.first().author.id}`, win+1);
              db.delete(`Play_${message.author.id}`)

          msg1.edit(embed);
        });
      });
  }
};
