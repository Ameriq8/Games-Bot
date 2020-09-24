const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bot",
  aliases: ["botinfo", "botstatus", "info"],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 5,
  exec: async (client, message, args) => {
    
    let uptime = convertMs(message.client.uptime);
    let ramUsage =
      (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
    let cpuStat = require("cpu-stat");
    let os = require('os');
    
    let statsEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${client.user.username} Information`,
        client.user.displayAvatarURL()
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(data.config.footer)
      .setColor(data.config.color)
      .addField(
        "> Versions",
        `**Node.js: **\`v${process.versions.node}\`\n**Discord.js: **\`v${Discord.version} \`\n**Mongoose: **\`v${mongoose.version}\`\n**Bot: **\`1.0.0\``,
        true
      )
      .addField(
        "> Leaderboard",
        `**Servers: **[${cm(client.guilds.cache.size)}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) \n**Users: ** [${cm(client.users.cache.size)}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\n**Channels: **[${cm(client.channels.cache.size)}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`,
        true
      )
     .addField('> About', `**Plateforem: **\`${os.type()} ${os.arch()}bit\`\n**CPU: **\`${os.cpus().map(i => `${i.model}`)[0]}\`\n**Ram: **\`${ramUsage}MB\`\n**Api Latence: **\`${Math.round(client.ws.ping)}ms \`\n**Library: **\`Discord.js\` \n**Developers: **<@442032295214579712>`)
     .addField('> Uptime', uptime);
     
     return message.channel.send(statsEmbed);
     
     function convertMs(mills) {
      let roundNumber = mills > 0 ? Math.floor : Math.ceil;

      let days = roundNumber(mills / 86400000),
        hours = roundNumber(mills / 3600000) % 24,
        mins = roundNumber(mills / 60000) % 60,
        secs = roundNumber(mills / 1000) % 60;

      var time = days > 0 ? `${days} Days, ` : "";

      time += hours > 0 ? `${hours} Hours, ` : "";

      time += mins > 0 ? `${mins} Minutes, ` : "";

      time += secs > 0 ? `${secs} Seconds` : "0 Seconds";

      return time;
    }
  }
}