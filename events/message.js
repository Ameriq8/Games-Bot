const guildModel = require("../models/guildModel");
const userModel = require("../models/userModel")
const activeUsers = {};
const xpCooldown = {};

module.exports = async message => {
  if (message.author.bot || !message.guild) return;
  let prefix = message.client.config.prefixes[0],
    cmdFile;
  for (let i = 0; i < message.client.config.prefixes.length; i++) {
    if (message.content.startsWith(message.client.config.prefixes[i])) prefix = message.client.config.prefixes[i];
  }
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild.language) {
    let language = "ar";
    let guildDocument = await guildModel.findOne({
      guildID: message.guild.id
    });
    if (guildDocument && guildDocument.language) language = guildDocument.language;
    message.guild.language = language;
  }
  
  if (message.guild) {
  let data = await userModel.findOne({ userID: message.author.id, guildID: message.guild.id });
    if (!data) data = new userModel({ userID: message.author.id, guildID: message.guild.id });
    
    await updateXp(message, data);
  }
  
  let args = message.content.slice(prefix.length).split(" ");
  command = args.shift();
  if (message.client.commands.has(command)) cmdFile = message.client.commands.get(command);
  else if (message.client.aliases.has(command)) cmdFile = message.client.aliases.get(command);
  else return;
  if (!cmdFile.enabled) return await message.channel.send(message.client.i18n.get(message.guild.language, "errors", "command_disabled"));
  if (cmdFile.ownerOnly && !message.client.config.owners.includes(message.author.id)) return await message.channel.send(message.client.i18n.get(message.guild.language, "errors", "command_owner_only"));
  if (cmdFile.permissions && !(message.client.config.owners.includes(message.author.id) || message.member.permissions.has(cmdFile.permissions))) return await message.channel.send(message.client.i18n.get(message.guild.language, "errors", "not_enough_permission", { permissions: cmdFile.permissions.join(", ") }));
  if (cmdFile.cooldown && typeof cmdFile.cooldown === "number" && cmdFile.cooldown >= 1 && cmdFile.cooldown <= 1440) {
    if (!activeUsers.hasOwnProperty(cmdFile.name)) activeUsers[cmdFile.name] = [];
    if (activeUsers[cmdFile.name].includes(message.author.id)) return await message.channel.send(message.client.i18n.get(message.guild.language, "errors", "wait_cooldown", { cooldown: cmdFile.cooldown }));
  }
  
  cmdFile.exec(message.client, message, args);
  if (activeUsers.hasOwnProperty(cmdFile.name)) {
    if (message.author.id !== client.config.owners) activeUsers[cmdFile.name].push(message.author.id);
    message.client.setTimeout(() => {
      activeUsers[cmdFile.name].splice(activeUsers[cmdFile.name].indexOf(message.author.id), 1);
    }, cmdFile.cooldown * 1000);
    
    async function updateXp(msg, data) {

      // Gets the user informations
      const points = parseInt(data.exp);
      const level = parseInt(data.level);

      // if the member is already in the cooldown db
      const isInCooldown = xpCooldown[msg.author.id];
      if (isInCooldown) {
        if (isInCooldown > Date.now()) {
          return;
        }
      }
      // Records in the database the time when the member will be able to win xp again (3min)
      const toWait = Date.now() + 60000;
      xpCooldown[msg.author.id] = toWait;

      // Gets a random number between 10 and 5 
      const won = Math.floor(Math.random() * (Math.floor(10) - Math.ceil(5))) + Math.ceil(5);

      const newXp = parseInt(points + won, 10);

      // calculation how many xp it takes for the next new one
      const neededXp = 5 * (level * level) + 80 * level + 100;

      // check if the member up to the next level
      if (newXp > neededXp) {
        data.memberData.level = parseInt(level + 1, 10);
      }

      // Update user data
      data.memberData.exp = parseInt(newXp, 10);
      await data.memberData.save();
    }

  }
}