class Base {
  static backCrText = "Назад";
    backCr = null;
    setBackCr(cr){
        this.backCr = cr;
        return this;
    }
}

module.exports = Base;
