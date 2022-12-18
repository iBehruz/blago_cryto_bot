const bot = require('../index');
const Msg = require('../controllers/msg');
const Base = require('./base');
const Editor = require('./editor');
const Session = require('../controllers/session');

class LTC extends Base{
  static  tx = 'LTC';
    available_cr = {
      
      //"CONFIRM": CONFIRM()
    };
    text = `Веди количество`;
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
       // this.init();
      }
    handleMsg(){

      let LTC_SUM = new Editor();
      console.log("-----Start Handler------Editor");
      
      if(Msg.get().text == Base.backCrText && this.backCr != null){
        return this.backCr;
      }

      if(LTC_SUM.validation()){
        Session.setData({LTC_SUM: Msg.get().text});
        console.log(Session.user);
        return true;
      }else{
        return false;
      }

      for(let cd in this.available_cr){
  
        console.log(this.available_cr[cd]);
        if(this.available_cr[cd].tx == Msg.get().text){
          return  this.available_cr[cd];
        }
      }

      return false;
    }
}

  module.exports = LTC;
