
const Buy = require('./buy/buy');
const Base = require('./base');
const Session = require('../controllers/session.js');
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
      super();
      this.init();
    }
    handleMsg(){

      if(Msg.get().text == Base.backCrText && this.backCr != null){
        return  Session.setCurrent(this.backCr);
      }

      for(let cd in this.available_cr){
        if(this.available_cr[cd].tx == Msg.get().text){
          return  Session.setCurrent(this.available_cr[cd]);
        }
      }

      return false;
    }

}

  module.exports = Start;
