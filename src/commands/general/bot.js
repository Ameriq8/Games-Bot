const BaseCommand = require('../../utils/structures/BaseCommand');
const { DiscordAPIError, MessageEmbed } = require('discord.js');
const cm = require('comma-number');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('Bot', 'general', ["Botinfo","infobot","bot"]);
  }

  async run(client, message, args) {



        const { version } = require("discord.js");
        let cpuStat = require("cpu-stat");
        let os = require('os');
        const ms = require('ms')
        let cpuLol;
        cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
    })
    var color = client.user.displayHexColor 

        var infobot = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addField('> 👾Versions',`**NodeJS: **\` v12.18.0 \`\n**Discord.js: **\` v${version} \`\n**Bot Version: **\`1.1.1\``,true)
        .addField('> 🙂Leaderboard',`**Servers: **[${cm(client.guilds.cache.size)}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) \n**Users: ** [${cm(client.users.cache.size)}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\n**Channels: **[${cm(client.channels.cache.size)}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`,true)
        .addField('> 🗻 About', `**Plateforem: **\`${os.type()} ${os.arch()}bit \`\n**CPU: **\`${os.cpus().map(i => `${i.model}`)[0]} \`\n**Bot Language: **\` Javascript \` \n**Bot Developers: **<@508449321176268801>, <@442032295214579712>`)
        .addField('> 🦿Processor', `**Ram: **\` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB \`\n**Api Latence: **\` ${Math.round(client.ws.ping)}ms \``,true)
        .addField('> 🌟UpTime Engien',`**\` ${Math.round(client.uptime / (1000 * 60 * 60))}h \`** **\` ${(Math.round(client.uptime / (1000 * 60)) % 60)}m \`** **\` ${(Math.round(client.uptime / 1000) % 60)}s \`**\n** ${ms(client.uptime, { long: true })}** `, true)      
        .addField("> 🔗 • __Links__",`[Bot Invite](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [Support Server](https://discord.gg/7YREmU5) | [Dashboard](https://www.google.com)`)
        .setColor(color); 
        message.channel.send(infobot);
    





      }
    }
    
  