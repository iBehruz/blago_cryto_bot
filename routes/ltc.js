const bot = require('../index');
const Msg = require('../controllers/msg');
const Base = require('./base');

class LTC extends Base{
  static  tx = 'LTC';
    available_cr = {
      
    };
    text = `Выбирай что хочешь купить`;
    options = {
      reply_markup: {
        // selective: true,
        // one_time_keyboard: true,
        resize_keyboard: true,
        keyboard: [
         
        ],
      }};
    constructor(){
        super();
        this.tx = LTC.tx;
        for(let cd in this.available_cr){
          this.available_cr[cd].setBackCr(this);
        }
      }

    handleMsg(){
      console.log("-----Start Handler------");

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

  module.exports = LTC;
