const moment = require("moment");
const config = {	"webhook1": "https://ptb.discordapp.com/api/webhooks/734122206744805506/oSeyaOd0M6XjmB51eL2EFbSE8cbwn0p5lhrvKAPLwAkpiDMVUvdG3dIlpcU_KKoSSuup"}
const Discord = require("discord.js");

exports.log = (content, type = "log") => {
    const checkWebhook = config.webhook1.match(/discordapp.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/);
    if (!checkWebhook) return;
    const webhook = new Discord.WebhookClient(checkWebhook[1], checkWebhook[2]);
    const timestamp = `\`[${moment().format("YYYY-MM-DD HH:mm:ss")}]: \``;
    switch (type) {
        case "log": case "warn": case "cmd": case "ready": case "error": case "debug":
          let embed =  new Discord.MessageEmbed()
          .setTitle(`: ${content}`)
          .addField("Time: ",`Time: ${timestamp}`)
          .addField(`About: `,`${content}`)
          return webhook.send(embed);
          
        default:
          throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");

exports.ready = (...args) => this.log(...args, "ready")