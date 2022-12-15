const bot = require('../index');
const Buy = require('./buy');
const Base = require('./base');
const { backCrText } = require('./base');
const Msg = require('../controllers/msg');

class Start extends Base{
   static tx = '/start';

   text = `Приветствую ${Msg.get().from.first_name}!
   У тебя большой обмен?!
   Тогда ты по адресу...
   
   Ваш текущий бонус: 0 сум
   Ваше количество успешных сделок: 0
   Команды /start /course /echo /help`;

   options = {
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


    available_cr = {
      "BUY": new Buy()
    };

    constructor(){
      super()
      this.tx = Start.tx;
      for(let cd in this.available_cr){
          this.available_cr[cd].setBackCr(this);
      }
    }

    handleMsg(){

      if(Msg.get().text == Base.backCrText && this.backCr != null){
        return this.backCr;
      }

      for(let cd in this.available_cr){
        if(this.available_cr[cd].tx == Msg.get().text){
          return  this.available_cr[cd];
        }
      }

      return false;
    }

}

  module.exports = Start;
