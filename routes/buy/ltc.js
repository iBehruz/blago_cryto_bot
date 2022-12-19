const Session = require('../../controllers/session');
const Msg = require('../../controllers/msg');
const Base = require('../base');
const Editor = require('../editor');

class LTC extends Base{
  static  tx = 'LTC';
    available_cr = {
      
      //"CONFIRM": CONFIRM()
    };
    formData = {
      "LTC_SUM": null,
      "LTC_WALLET": null
    };

    onShow(){
      this.formData = {
        "LTC_SUM": null,
        "LTC_WALLET": null
      };
    }

    text = `Введите количество`;
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

        if(Msg.get().text == Base.backCrText && this.backCr != null){
          return  Session.setCurrent(this.backCr);
        }
  
        for(let cd in this.available_cr){
          if(this.available_cr[cd].tx == Msg.get().text){
            return  Session.setCurrent(this.available_cr[cd]);
          }
        }

       // this.formData["LTC_SUM"] = "34";
        console.log(this);
        if(this.formData["LTC_SUM"] == null){
            let valid = validation.LTC(Msg.get().text);
            if(!( valid == true)){
              Msg.sendText(valid);
            }else{
              this.formData["LTC_SUM"] = Msg.get().text;
              Msg.sendText("Ведите адрес кашелька");
            }
            return true;
        }



        if(this.formData["LTC_WALLET"] == null){
          let valid = validation.WALLET(Msg.get().text);
          if(!( valid == true)){
            Msg.sendText(valid);
          }else{
            this.formData["LTC_WALLET"] = Msg.get().text;
            Msg.sendMsg("Отправьте деньги и нажмите кнопку отправил!", {
              reply_markup: {
                // selective: true,
                // one_time_keyboard: true,
                resize_keyboard: true,
                keyboard: [
                 [{text: "Отправил"}],
                 [{text: Base.backCrText}]
                ],
              }});
          }
          return true;
      }
        
        return true;
        return false;
      }
}


let validation = {
  LTC: function(val){
    console.log(val);

    if(parseFloat(val) == 0 || isNaN(parseFloat(val))){
      return "Ведите правильную сумму";
    }

    if(!(parseFloat(val) >= 17)){
      return "Сумма не должна быть меньше минимальной";
    }

    return true;
  },
  WALLET: function(val){
    if(!(val.length >= 5)){
      return "Введите правильный адрес кошелька!";
    }

    return true;
  }
};

  module.exports = LTC;
