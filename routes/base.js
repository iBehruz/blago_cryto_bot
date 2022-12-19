
class Base {
  text = "none";
  options = {};
  available_cr = {};
  constructor(){
    this.tx = this.constructor.tx;
  }

  init(){
    for(let cd in this.available_cr){
      this.available_cr[cd].setBackCr(this);
    }
  }

  onShow(){
    
  }


  static backCrText = "Назад";
    backCr = null;
    setBackCr(cr){
      if(this.backCr == null){
        this.options.reply_markup.keyboard.push(
          [{text: Base.backCrText}]
        );
      }
        this.backCr = cr;
        return this;
    }
}

module.exports = Base;
