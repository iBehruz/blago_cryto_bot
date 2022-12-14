const bot = require('../index');
const Buy = require('./buy');
const Base = require('./base');
const { backCrText } = require('./base');
class Start extends Base{
   static tx = '/start';

    available_cr = {
      "BUY": new Buy()
    };

    constructor(){
      super()
      this.tx = Start.tx;
      
    }

    handleMsg(msg, metadata){

      console.log("-----Start Handler------");


      if(msg.text == Base.backCrText && this.backCr != null){
        return this.backCr;
      }

      for(let cd in this.available_cr){
        console.log(this.available_cr[cd]);
        if(this.available_cr[cd].tx == msg.text){
          return  this.available_cr[cd].setBackCr(this);
        }
      }

      return false;
    }


    sendMsg(msg, metadata){
      let text = `Приветствую ${msg.from.first_name}!
      У тебя большой обмен?!
      Тогда ты по адресу...
      
      Ваш текущий бонус: 0 сум
      Ваше количество успешных сделок: 0
      Команды /start /course /echo /help`;
      let op = {
        reply_markup: {
          // selective: true,
          // one_time_keyboard: true,
          resize_keyboard: true,
          keyboard: [
            [{text: Buy.tx}, {text: "🥇 Продать криптовалюту"}],
            [{text: "🟢 Мои активные сделки"}],
            [{text: "🔢 Калькулятор"}],
            [{text: "👥 Рефералка"}, {text: "🎁 Промокоды"}],
            [{text: "📘 Контакты"}, {text: "📭 Оставить отзыв"}],
          ],
        }};

        if(this.backCr != null){
          op.reply_markup.keyboard.push(
            [{text: Base.backCrText}]
          );
        }

        bot.sendMessage(msg.chat.id, text, op)

        return this;
    }
}

  module.exports = Start;
