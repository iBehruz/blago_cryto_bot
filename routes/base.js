const bot = require('../index');
const Msg = require('../controllers/msg');
class Base {
  text = "none";
  options = {};


  activate(){

    if(this.backCr != null){
      this.options.reply_markup.keyboard.push(
        [{text: Base.backCrText}]
      );
    }



    bot.sendMessage(Msg.get().chat.id, this.text, this.options);
    return this;
  }

  static backCrText = "Назад";
    backCr = null;
    setBackCr(cr){
        this.backCr = cr;
        return this;
    }
}

module.exports = Base;
