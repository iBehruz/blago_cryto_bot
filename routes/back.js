const bot = require('../index');
const LTC = require('./ltc');
const Base = require('./base');
class Back extends Base{
  static  tx = 'Назад';
    backCr = null;

    constructor(backCr){
        return new backCr();
    }
}

  module.exports = Back;
