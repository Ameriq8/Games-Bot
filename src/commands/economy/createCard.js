const BaseCommand = require('../../utils/structures/BaseCommand');
const globalData = require("../../database/user")
const { MessageEmbed } = require('discord.js');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('create-card', 'economy', ['create card']);
  }

  async run(client, message, args) {
    var cardType = ["Visa", "MasterCard"];
    var expirDate = ["1/22", "2/22", "3/22", "4/22", "5/22", "6/22", "7/22", "8/22", "9/22", "10/22", "11/22", "12/22", "1/23", "2/23", "3/23", "4/23", "5/23", "6/23", "7/23", "8/23", "9/23", "10/23", "11/23", "12/23", "1/24", "2/24", "3/24", "4/24", "5/24", "6/24", "7/24", "8/24", "9/24", "10/24", "11/24", "12/24", "1/25", "2/25", "3/25", "4/25", "5/25", "6/25", "7/25", "8/25", "9/25", "10/25", "11/25", "12/25"]

    globalData.findOne({
        userID: message.author.id
      },
      (err, bc) => {
        if (err) console.log(err);
        const cc = new globalData({
          bank: {
            cardName: message.author.username,
            cardType: Math.floor(Math.random() * cardType),
            cardID: cardNumber(),
            cardexpirDate: Math.floor(Math.random() * expirDate),
            bankCoins: 0
          },
        })

        function cardNumber() {
          let id = "";
          const numbers =
            "12345678909876544321";
          for (let i = 0; i < 16; i++)
            id += numbers.charAt(Math.floor(Math.random() * numbers.length));
          return id;
        }
      }
    )
  }
};