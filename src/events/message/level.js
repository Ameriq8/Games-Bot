const BaseEvent = require("../../utils/structures/BaseEvent");
const userData = require("../../database/user")
const db = require("quick.db");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {

    if (message.author.bot) return;

    function generateXp() {
      let min = 2;
      let max = 20;

      return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    let user = message.author;

    

    let nxtLevel = exp * 300;

    if (!is(user.id)) {
      add(user.id);
      db.add(`exp_${user.id}`, generateXp());

      setTimeout(() => {
        remove(user.id);
      }, 1000 * 20);
    }

    while (xp >= nxtLevel) {
      if (xp >= nxtLevel) {

        db.add(`level_${user.id}`, 1);
        
        message.channel.send(`**${user} __Congrats!,__  You have reached level \`#\` __${level}__ \`#\`**`);
      }
    }

    let array = [];
    
    function add(id) {
      array.push(id);
    }
    
    function remove(id) {
      array.splice(array.indexOf(id), 1);
    }
    
    function is(id) {
      return array.includes(id);
    }
    
  }
};