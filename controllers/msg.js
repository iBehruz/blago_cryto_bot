
const bot = require('../index');

class Msg {
    
    msg = null;
    metadata = null;

    getType(){
 
    }
    getMeta(){
        return this.metadata;
    }
    get(){
        return this.msg;
    }

    set(msg, metadata){
        this.msg = msg;
        this.metadata = metadata;
    }

    sendText(text){
        bot.sendMessage(this.get().chat.id, text);
    }

    sendMsg(text, options){
        bot.sendMessage(this.get().chat.id, text, Object.assign({}, options));
    }
}

module.exports = new Msg();