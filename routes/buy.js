const bot = require('../index');
const LTC = require('./ltc');
const Base = require('./base');
const Msg = require('../controllers/msg');

class Buy extends Base{
  static  tx = '💵 Купить криптовалюту';
    available_cr = {
      "LTC": new LTC()
    };


    text = `Выбирай что хочешь купить`;
 
    options = {
      reply_markup: {
        // selective: true,
        // one_time_keyboard: true,
        resize_keyboard: true,
        keyboard: [
          [{text: LTC.tx}],
        ],
      }};



      constructor(){
        super();
        this.init();
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

  module.exports = Buy;
