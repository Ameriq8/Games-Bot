const BaseEvent = require("../../utils/structures/BaseEvent");
const userData = require("../../database/user");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {

    if (message.author.bot) return;

    globalData.findOne(
      {
        userID: message.author.id
      },
      (err, db) => {

        if (err) console.log(err);

        if (!db) {
          const f = new globalData({
            userID: message.author.id,
            userName: message.author.username,
            eco: {
              coins: 0,
              totalTax: 0,
              _time: Date()
            }
          })
          await f.save().catch(err => console.log(err))
        }
      });
  }
};