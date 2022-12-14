const bot = require('../index');
const LTC = require('./ltc');
const Base = require('./base');
class Buy extends Base{
  static  tx = '💵 Купить криптовалюту';
    available_cr = {
      "LTC": new LTC()
    };
    constructor(){
      super()
      this.tx = Buy.tx;
      
    }

    handleMsg(msg, metadata){
      console.log("-----Start Handler------");
      if(msg.text == Base.backCrText && this.backCr != null){
        return this.backCr;
      }
      for(let cd in this.available_cr){
        if(this.available_cr[cd].tx == msg.text){
          
          return  this.available_cr[cd].setBackCr(this);
        }
      }

      return false;
    }


    sendMsg(msg, metadata){
      let text = `Выбирай что хочешь купить`;

      let op = {
        reply_markup: {
          // selective: true,
          // one_time_keyboard: true,
          resize_keyboard: true,
          keyboard: [
            [{text: LTC.tx}],
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

  module.exports = Buy;
