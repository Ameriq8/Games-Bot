const userModel = require("../../models/userModel");
const { Canvas, resolveImage } = require("canvas-constructor");
const Discord = require("discord.js");
const cm = require('comma-number');

module.exports = {
  name: "profile",
  aliases: ["user"],
  permissions: [],
  ownerOnly: true,
  enabled: true,
  cooldown: 5,
  exec: async (client, message, args) => {
    let user =
      message.mentions.members.last() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(a => a.username == args) ||
      message.guild.members.cache.get(a => a.displayName == args[0]) ||
      message.member;
      
    let data = await userModel.findOne({ userID: user.id, guildID: message.guild.id });
    if (!data) data = new userModel({ userID: user.id, guildID: message.guild.id });

    const avatar = await resolveImage(
      user.displayAvatarURL({ format: "jpg", size: 1024 })
    );

    var member =
      message.mentions.members.last() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(a => a.username == args) ||
      message.guild.members.cache.get(a => a.displayName == args[0]) ||
      message.member;

    var status = {
      dnd: "RED",
      online: "#2ecc71",
      offline: "DIMGRAY",
      idle: "GOLD"
    };
    
    var bg = await resolveImage(`https://cdn.glitch.com/5cc7025c-200c-4d66-9060-1775d9e055a5%2FPicsArt_09-22-08.21.39.jpg?v=1600795387646`);
    var xp = 520;
    var level = 3;
    var nxtLvlXp = level * 250;
    var difference = (nxtLvlXp - xp);
    var difference2 = xp / nxtLvlXp * 990
    var wlm = 10000/(10000 + 7980) * 7
    var ct = Math.round(1 + 1000);
    
    const name = user.username.length > 15 ? user.username.substring(0, 12) + "...": user.username;
    
    const tt = await new Canvas(1000, 800)

      .setColor("#333")
      .printRectangle(0, 0, 1000, 800)
      .setColor("#FFFFFF")
      .printImage(bg, 0, 0, 1000, 300)
      .setColor(
        `${status[member.user.presence.status] ||
          `${member.user.presence.status}`}`
      )
      .printCircle(140, 300, 108)
      .printCircularImage(avatar, 140, 300, 100)
      .setTextFont("bold 30px sans-serif")
      .setTextAlign("left")
      .setColor("#FFFFFF")
    
      .printText(`Name: ${name}`, 310, 350)
      .printText(`#: ${user.discriminator}`, 310, 410)
    
      .printText(`Points: 10000`, 40, 470)
      .printText(`Wins: 10000`, 40, 530)
      .printText(`Loses: 7980`, 40, 590)
      .printText(`Matches: 2`, 40, 650)
      .printText(`W/L: ${wlm.toFixed(2)}`, 40, 710)
    
      .printText(`Coins: 1`, 310, 470)
      .printText(`TotalTax: 1000`, 310, 530)
      .printText(`CT: ${ct}`, 310, 590)
    
      .printText(`Level: ${level}`, 630, 470)
      .printText(`Exp: ${xp}/${nxtLvlXp}`, 630, 530)
      .printText(`Next Level: ${difference} exp`, 630, 590)
    
      .setColor("#FFFFFF")
      .printRectangle(1, 790, difference2, 45)
      .toBuffer();

    const filename = `profile.png`;
    const attachment = new Discord.MessageAttachment(tt, filename);
    message.channel.send(attachment);
  }
}