const Base = require("./base");
const Buy = require("./buy");
const Msg = require('../controllers/msg');

class Editor extends Base{
    static types = {
        LTC_SUM: {
            length: 14,
            minLength: 14
        }
    }
    get tx() {
        return Msg.get().text;
      }
    set tx(v){
      return v;
    }


    type = "text";
    errorText = "Ведите правильное значение";
    

    validation(){
        if(Msg.get().text >= Editor.types.LTC_SUM.minLength){
            return true;
        }
        return false;
    }





}


module.exports = Editor;